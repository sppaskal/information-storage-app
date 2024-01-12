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
        'add/', views.AddAccount.as_view(),
        name='add_account'),
    path(
        'update/<int:id>/', views.UpdateAccount.as_view(),
        name='update_account'),
    path(
        'delete/<int:id>/', views.DeleteAccount.as_view(),
        name='delete_account'),
    path(
        'list/', views.ListAccounts.as_view(),
        name='list_accounts'
    ),
    path(
        'list/by-email/<str:email>', views.ListAccountsByEmail.as_view(),
        name='list_accounts_by_email'
    ),
    path('', include(router.urls)),
]
