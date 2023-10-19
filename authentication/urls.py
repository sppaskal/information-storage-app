from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'authentication'

urlpatterns = [
    path(
        'connection-test/',
        views.TestConnection.as_view(), name='test_connection'
    ),
    path(
        'api-token-auth/',
        obtain_auth_token, name='api_token_auth'
    ),
]
