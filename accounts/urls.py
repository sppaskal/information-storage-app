from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

app_name = 'accounts-api'

# Create a routers and register them with viewsets
router = DefaultRouter()
router.register(r'types', views.TypeViewSet)

# Define url patterns
urlpatterns = [
    path(
        'connection-test/', views.TestConnection.as_view(),
        name='test_connection'),
    path(
        'test/', views.Test.as_view(),
        name='test'),
    path(
        'accounts/', views.AddAccount.as_view(),
        name='add_account'),
    path(
        'accounts/<int:id>/', views.ManageAccount.as_view(),
        name='manage_account'),
    path(
        'accounts', views.ListAccounts.as_view(),
        name='list_accounts'
    ),
    path(
        'accounts/by-email/<str:email>', views.ListAccountsByEmail.as_view(),
        name='list_accounts_by_email'
    ),
    path(
        'accounts/by-id/<int:account_id>', views.GetAccountByID.as_view(),
        name='get_account_by_id'
    ),
    path('', include(router.urls)),
]
