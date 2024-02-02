from django.shortcuts import render
from django.conf import settings

base_url = settings.DEV_BASE_URL

# -------------------------------------------------------------------------------


def login_view(request):
    return render(
        request=request,
        template_name='login.html',
        context={'base_api_url': base_url}
    )

# -------------------------------------------------------------------------------


def accounts_view(request):
    return render(
        request=request,
        template_name='accounts.html',
        context={'base_api_url': base_url}
    )

# -------------------------------------------------------------------------------


def account_details_view(request, account_id):
    return render(
        request=request,
        template_name='account_details.html',
        context={
            'base_api_url': base_url,
            'account_id': account_id
        }
    )
