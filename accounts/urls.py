from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import account_views, test_views, type_views

app_name = 'accounts-api'

router = DefaultRouter()
router.register(r'accounts', account_views.AccountViewSet, basename='account')
router.register(r'types', type_views.TypeViewSet)

urlpatterns = [
    path(
        'connection-test/',
        test_views.TestConnection.as_view(),
        name='test_connection'
    ),
    path(
        'test/',
        test_views.Test.as_view(),
        name='test'
    ),
    path(
        '',
        include(router.urls)
    ),
]
