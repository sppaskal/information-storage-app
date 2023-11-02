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
        'login/', TokenObtainPairView.as_view(),
        name='login'
    ),
    path(
        'token/', TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),
]
