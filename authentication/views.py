from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

class TestConnection(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Your view logic here
        return Response({"message": "Connection Successful"})


class Login(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Your view logic here
        return Response({"message": "Successful Login"})
