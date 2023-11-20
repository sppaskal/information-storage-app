from django.shortcuts import render
from django.conf import settings


def login_initial_view(request):
    return render(
        request=request,
        template_name='login_initial.html',
        context={'base_api_url': settings.DEV_BASE_URL}
    )
