from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

app_name = 'authentication'

urlpatterns = [
    path(
        'connection-test/',
        views.TestConnection.as_view(),
        name='test_connection'
    ),
    path(
        'login-initial/', views.LoginInitial.as_view(),
        name='login-initial'
    ),
    path(
        'login-final/', views.LoginFinal.as_view(),
        name='login-final'
    ),
]
