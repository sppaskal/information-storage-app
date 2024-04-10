from django.urls import path
from . import views

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
    path(
        'user/', views.CreateUser.as_view(),
        name='create_user'
    ),
    path(
        'user/', views.UpdateUser.as_view(),
        name='update_user'
    ),
]
