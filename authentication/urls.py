from django.urls import path
from .views import (
    test_views,
    authentication_views,
    user_views,
)

app_name = 'authentication'

urlpatterns = [
    path(
        'connection-test/',
        test_views.TestConnection.as_view(),
        name='test_connection'
    ),
    path(
        'login-initial/', authentication_views.LoginInitial.as_view(),
        name='login-initial'
    ),
    path(
        'login-final/', authentication_views.LoginFinal.as_view(),
        name='login-final'
    ),
    path(
        'user/', user_views.CreateUser.as_view(),
        name='create_user'
    ),
    path(
        'user/update/', user_views.UpdateUser.as_view(),
        name='update_user'
    ),
]
