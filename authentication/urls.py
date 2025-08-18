from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    test_views,
    authentication_views,
    user_views
)

app_name = 'authentication'

router = DefaultRouter()
router.register(r'user', user_views.UserViewSet, basename='user')

urlpatterns = [
    path(
        'connection-test/',
        test_views.TestConnection.as_view(),
        name='test_connection'
    ),
    path(
        'login-initial/',
        authentication_views.LoginInitial.as_view(),
        name='login-initial'
    ),
    path(
        'login-final/',
        authentication_views.LoginFinal.as_view(),
        name='login-final'
    ),
    path('', include(router.urls)),
]
