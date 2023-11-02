from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status


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

    def get(self, request):
        pass
