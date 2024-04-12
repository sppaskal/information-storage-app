from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    test_views,
    type_views,
    account_views
)

app_name = 'accounts-api'

# Create a routers and register them with viewsets
router = DefaultRouter()
router.register(r'types', type_views.TypeViewSet)

# Define url patterns
urlpatterns = [
    path(
        'connection-test/', test_views.TestConnection.as_view(),
        name='test_connection'),
    path(
        'test/', test_views.Test.as_view(),
        name='test'),
    path(
        'accounts/', account_views.AddAccount.as_view(),
        name='add_account'),
    path(
        'accounts/<int:id>/', account_views.ManageAccount.as_view(),
        name='manage_account'),
    path(
        'accounts', account_views.ListAccounts.as_view(),
        name='list_accounts'
    ),
    path(
        'accounts/by-email/<str:email>', account_views.ListAccountsByEmail.as_view(),
        name='list_accounts_by_email'
    ),
    path(
        'accounts/by-id/<int:account_id>', account_views.GetAccountByID.as_view(),
        name='get_account_by_id'
    ),
    path('', include(router.urls)),
]
