from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from cryptography.fernet import Fernet

class TestConnection(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"message": "Connection Successful"})