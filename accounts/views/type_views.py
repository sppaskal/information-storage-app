from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from ..helpers.type_helper import TypeHelper
from utils.caching import Caching
from ..serializers import (
    TypeSerializer,
)
import logging

logger = logging.getLogger(__name__)

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

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            Caching.delete_cache_value("types")

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

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()
            Caching.delete_cache_value("types")

            return Response(status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            logger.error(str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
