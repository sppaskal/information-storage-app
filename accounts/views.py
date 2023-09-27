from django.http import HttpResponse
from django.views import View

# Create your views here.
class TestConnection(View):
    def get(self, request):
        return HttpResponse("Connection Successful")

class AddAccount(View):
    def post(self, request):
        return HttpResponse("Done")