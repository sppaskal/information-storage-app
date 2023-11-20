from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .helpers.acces_code_helper import AccessCodeHelper
from utils.other import Other
from utils.notifications import Email
from .serializers import AccessCodeSerializer
import logging

logger = logging.getLogger(__name__)


class TestConnection(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        msg = "Connection Successful"
        logger.info(msg)
        return Response(
            {"message": msg},
            status=status.HTTP_200_OK
        )

# -------------------------------------------------------------------------------


class LoginInitial(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            username = request.data.get("username")
            password = request.data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None:
                access_code = AccessCodeHelper.get_access_code_instance_by_user_id(
                    user_id=user.id
                )
                random_code = Other.random_integer(10000, 99999)
                # update AccessCode entry with new code if it exists
                if access_code is not None:
                    access_code.code = random_code
                    access_code.used = False
                    access_code.save()
                # create AccessCode entry for user if it doesn't exist
                else:
                    access_code_data = {
                        "user": user.id,
                        "code": random_code
                    }
                    serializer = AccessCodeSerializer(data=access_code_data)

                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response(
                            serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST
                        )

                # email code to user
                email_response = Email.send_email(
                    title="Your Information Storage App Access Code",
                    message="Your access code is: " + str(random_code),
                    recipients=[user.email]
                )

                if not email_response.get("sent"):
                    logger.error(email_response.get("error"))
                    return Response(
                        data=email_response.get("error"),
                        status=status.HTTP_400_BAD_REQUEST
                    )

                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# -------------------------------------------------------------------------------


class LoginFinal(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            username = request.data.get("username")
            password = request.data.get("password")
            code = request.data.get("access_code")
            user = authenticate(username=username, password=password)

            if user is None:
                return Response(
                    {"error": "invalid username or password"},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            access_code = AccessCodeHelper.get_access_code_instance_by_user_id(
                user_id=user.id
            )

            if access_code is not None:
                if int(access_code.code) == int(code):
                    if not access_code.used:
                        access_code.used = True
                        access_code.save()

                        new_refresh = RefreshToken.for_user(user)
                        new_access = AccessToken.for_user(user)

                        return Response(
                            {
                                "access_token": str(new_access),
                                "refresh_token": str(new_refresh)
                            },
                            status=status.HTTP_200_OK
                        )
                    else:
                        error_msg = "access code is expired"
                else:
                    error_msg = "access code is incorrect"
            else:
                error_msg = "access code does not exist"

            logger.error(error_msg)
            return Response(
                {"error": error_msg},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
