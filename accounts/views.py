from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from .helpers.account_helper import AccountHelper
from .helpers.type_helper import TypeHelper
from utils.caching import Caching
from .serializers import (
    AccountSerializer,
    AccountUpdateSerializer,
    TypeSerializer,
)
import logging

logger = logging.getLogger(__name__)

# -------------------------------------------------------------------------------


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


class Test(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Enter test code here
            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# -------------------------------------------------------------------------------


class AddAccount(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Deserialize and validate the incoming data
            serializer = AccountSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()

                Caching.delete_cache_value("accounts")

                return Response(
                    {
                        "message": "Added Account",
                        "account": serializer.data
                    },
                    status=status.HTTP_201_CREATED
                )

            else:
                logger.error(str(serializer.errors))
                return Response(
                    {"error": str(serializer.errors)},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except Exception as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# -------------------------------------------------------------------------------


class ManageAccount(generics.UpdateAPIView, generics.DestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = AccountUpdateSerializer
    lookup_field = 'id'

    def get_queryset(self):
        account_id = self.kwargs.get('id')
        return AccountHelper.get_account_qs_by_id(account_id)

    def update(self, request, *args, **kwargs):
        try:
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            serializer = self.get_serializer(
                instance,
                data=request.data,
                partial=partial
            )
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            Caching.delete_cache_value("accounts")

            return Response(
                {
                    "message": "Updated Account",
                    "account": serializer.data
                },
                status=status.HTTP_200_OK
            )

        except ValidationError as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            account_email = instance.email
            self.perform_destroy(instance)

            Caching.delete_cache_value("accounts")

            return Response(
                {
                    "message": "Deleted Account: " + str(account_email),
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# -------------------------------------------------------------------------------


class ListAccounts(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Check cache
            cache_key = "accounts"
            cached_data = Caching.get_cache_value(cache_key)
            if cached_data is not None:
                return Response(
                    cached_data,
                    status=status.HTTP_200_OK
                )

            # If no cache then pull and process from db
            accounts = AccountHelper.select_related_fields(
                AccountHelper.get_all_accounts()
            )
            serializer = AccountSerializer(
                accounts,
                many=True,
            )
            Caching.set_cache_value(
                key=cache_key,
                value=serializer.data
            )

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# -------------------------------------------------------------------------------


class ListAccountsByEmail(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, email):
        try:
            # Check cache
            cache_key = "accounts"
            cached_data = Caching.get_cache_value(cache_key)
            if cached_data is not None:
                return Response(
                    AccountHelper.filter_accounts_by_email(
                        data=cached_data,
                        email=email
                    ),
                    status=status.HTTP_200_OK
                )

            accounts = AccountHelper.select_related_fields(
                AccountHelper.get_account_qs_by_email(email)
            )
            serializer = AccountSerializer(
                accounts,
                many=True,
            )

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# -------------------------------------------------------------------------------


class TypeViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = TypeSerializer
    queryset = TypeHelper.get_all_types()
    lookup_field = 'id'

    def list(self, request, *args, **kwargs):
        try:
            # Check cache
            cache_key = "types"
            cached_data = Caching.get_cache_value(cache_key)
            if cached_data is not None:
                return Response(
                    cached_data,
                    status=status.HTTP_200_OK
                )

            # If no cache then pull and process from db
            queryset = TypeHelper.get_all_types()
            serializer = self.get_serializer(queryset, many=True)
            Caching.set_cache_value(
                    key=cache_key,
                    value=serializer.data
                )

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            Caching.delete_cache_value("types")

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# -------------------------------------------------------------------------------
