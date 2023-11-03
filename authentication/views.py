from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .helpers.acces_code_helper import AccessCodeHelper
from utils.other import Other
from utils.notifications import Email
from .serializers import AccessCodeSerializer


class TestConnection(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(
            {"message": "Connection Successful"},
            status=status.HTTP_200_OK
        )

# -------------------------------------------------------------------


class Login(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            access_code = AccessCodeHelper.get_access_code_instance_by_user_id(user.id)
            random_code = Other.random_integer(10000, 99999)
            # update AccessCode entry with new code if it exists
            if access_code is not None:
                access_code.code = random_code
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
                message="Your code is: " + str(random_code),
                recipients=[user.email]
            )

            if not email_response.get("sent"):
                return Response(
                    data=email_response.get("error"),
                    status=status.HTTP_400_BAD_REQUEST
                )

            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
