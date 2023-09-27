from django.http import HttpResponse
from django.views import View

# Create your views here.
def test(request):
    return HttpResponse("Connection successful")

class AddAccount(View):
    def post(self, request):
        return HttpResponse("Done")