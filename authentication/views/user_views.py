from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action

# Local imports for user logic and serializers
from ..helpers.user_helper import UserHelper
from ..serializers import UserSerializer, UserUpdateSerializer

# Logger setup for error tracking
import logging
logger = logging.getLogger(__name__)


# ViewSet for managing user-related API endpoints
class UserViewSet(ViewSet):
    # JWT-based authentication for all actions
    authentication_classes = [JWTAuthentication]

    # Dynamically assign permissions based on action
    def get_permissions(self):
        # Allow unauthenticated access for user creation
        if self.action == 'create':
            return [AllowAny()]
        # Require authentication for all other actions
        return [IsAuthenticated()]

    # POST /authentication/user/ — Create a new user
    def create(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                # Create user and profile
                user = UserHelper.create_user(serializer.validated_data)

                response_serializer = UserSerializer(user)
                return Response(
                    response_serializer.data,
                    status=status.HTTP_201_CREATED
                )

            # Return validation errors
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"User creation failed: {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    # PATCH /authentication/user/me/ — Update the authenticated user's profile
    @action(detail=False, methods=['patch'], url_path='me')
    def update_me(self, request):
        try:
            # Apply partial update to the current user
            serializer = UserUpdateSerializer(
                request.user,
                data=request.data,
                partial=True
            )
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            # Return validation errors
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"User update failed: {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
