from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializers import AccountSerializer

class TestConnection(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Your view logic here
        return Response({"message": "Connection Successful"})


class AddAccount(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.data)
        # Deserialize and validate the incoming data
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            # Save the data to the database
            serializer.save()
            return Response(
                {
                    "message": "Added Account",
                    "account": serializer.data
                }
            )
        else:
            return Response(serializer.errors, status=400)  # Return validation errors if data is invalid
