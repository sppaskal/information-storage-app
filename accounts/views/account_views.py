# Django REST Framework imports for building API views
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

# Local imports for models, serializers, helpers, and caching
from ..models import Account
from ..serializers import AccountSerializer, AccountUpdateSerializer
from ..helpers.account_helper import AccountHelper
from utils.caching import Caching

# Logger setup for error tracking
import logging
logger = logging.getLogger(__name__)

# ViewSet for managing Account-related API endpoints
class AccountViewSet(viewsets.ModelViewSet):
    # Base queryset for all account operations
    queryset = Account.objects.all()

    # JWT-based authentication and permission enforcement
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    # Default serializer used unless overridden
    serializer_class = AccountSerializer

    # Use 'id' field for object lookup in path-based endpoints
    lookup_field = 'id'

    # Dynamically select serializer based on action
    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            return AccountUpdateSerializer
        return AccountSerializer
    
    # Override generic get_queryset to filter by authenticated user
    def get_queryset(self):
        user_id = self.request.user.id
        return Account.objects.filter(user_id=user_id)

    # GET /accounts/ — List all accounts, with caching
    def list(self, request):
        try:
            user_id = request.user.id
            cache_key = "accounts"

            cached_data = Caching.get_cache_value(cache_key, user_id)
            if cached_data:
                return Response(cached_data)

            # If cache unavailable, query database
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            Caching.set_cache_value(cache_key, serializer.data, user_id=user_id)
            return Response(serializer.data)

        except Exception as e:
            logger.error(f"Error listing accounts: {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    # POST /accounts/ — Create a new account
    def create(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            cache_key = "accounts"
            user_id = request.user.id
            Caching.delete_cache_value(cache_key, user_id)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            logger.error(f"Error creating account: {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    # PUT/PATCH /accounts/{id}/ — Update an existing account
    def update(self, request, *args, **kwargs):
        try:
            account_id = kwargs.get('id')
            account = get_object_or_404(self.get_queryset(), id=account_id)
            serializer = AccountUpdateSerializer(
                account,
                data=request.data,
                partial=(request.method == 'PATCH')
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()

            cache_key = "accounts"
            user_id = request.user.id
            Caching.delete_cache_value(cache_key, user_id)
            return Response(
                {"message": "Updated Account", "account": serializer.data}
            )

        except Exception as e:
            logger.error(f"Error updating account '{account_id}': {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    # DELETE /accounts/{id}/ — Delete an account
    def destroy(self, request, *args, **kwargs):
        try:
            account_id = kwargs.get('id')
            account = get_object_or_404(self.get_queryset(), id=account_id)
            email = account.email
            account.delete()

            cache_key = "accounts"
            user_id = request.user.id
            Caching.delete_cache_value(cache_key, user_id)
            return Response(
                {"message": f"Deleted Account: {email}"},
                status=status.HTTP_204_NO_CONTENT
            )

        except Exception as e:
            logger.error(f"Error deleting account '{account_id}': {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    # GET /accounts/{id}/ — Retrieve a single account, with optional cache lookup
    def retrieve(self, request, *args, **kwargs):
        try:
            account_id = kwargs.get('id')
            user_id = request.user.id
            cache_key = "accounts"
            cached_data = Caching.get_cache_value(cache_key, user_id)
            if cached_data:
                filtered = AccountHelper.filter_accounts_by_id(
                    cached_data,
                    account_id
                )
                return Response(filtered)

            # If cache unavailable, query database
            account = get_object_or_404(self.get_queryset(), id=account_id)
            serializer = self.get_serializer(account)
            return Response(serializer.data)

        except Exception as e:
            logger.error(f"Error retrieving account '{account_id}': {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    # GET /accounts/by-email/?email=... — Filter accounts by email
    @action(detail=False, methods=['get'], url_path='by-email')
    def by_email(self, request):
        try:
            email = request.query_params.get('email')
            if not email:
                return Response(
                    {"error": "Missing 'email' query parameter"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            user_id = request.user.id
            cache_key = "accounts"
            cached_data = Caching.get_cache_value(cache_key, user_id)
            if cached_data:
                filtered = AccountHelper.filter_accounts_by_email(
                    cached_data,
                    email
                )
                return Response(filtered)

            # If cache unavailable, query database
            queryset = self.get_queryset().filter(email=email)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

        except Exception as e:
            logger.error(f"Error fetching account by email '{email}': {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
