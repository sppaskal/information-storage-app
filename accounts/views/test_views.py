from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
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


# To be used for testing code
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
