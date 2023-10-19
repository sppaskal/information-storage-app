from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path(
        'connection-test/', views.TestConnection.as_view(),
        name='test_connection'),
    path(
        'add/', views.AddAccount.as_view(), 
        name='add_account'),
    path(
        'list/', views.ListAccounts.as_view(),
        name='list_accounts'
    ),
    path(
        'list/by-email/<str:email>', views.ListAccountsByEmail.as_view(),
        name='list_accounts_by_email'
    ),
    path(
        'add/type/', views.AddType.as_view(),
        name='add_type'
    ),
]
