from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.forms.models import model_to_dict
from ..helpers.user_helper import UserHelper
from ..serializers import (
    UserSerializer
)
import json
import logging

logger = logging.getLogger(__name__)

# -------------------------------------------------------------------------------


class CreateUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                # If username and email are unique -> Create user
                UserHelper.create_user(serializer.validated_data)
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

        except Exception as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# -------------------------------------------------------------------------------


class UpdateUser(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        try:
            # update the user object
            updated_user = UserHelper.update_user(
                user_obj=request.user,
                update_data=json.loads(request.body)
            )

            # check for validity
            serializer = UserSerializer(data=model_to_dict(updated_user))
            if serializer.is_valid():
                # save the updated user object into the db
                updated_user.save()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

        except Exception as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
