from django.http import HttpResponse
from django.views import View
from django.http import JsonResponse
from django.middleware.csrf import get_token

# Create your views here.

class TestConnection(View):
    def get(self, request):
        return HttpResponse("Connection Successful")

class GetCSRFToken(View):
    def get(self, request):
        csrf_token = get_token(request)
        return JsonResponse({'csrf_token': csrf_token})