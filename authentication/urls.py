from django.urls import path
from . import views

app_name = 'authentication'

urlpatterns = [
    path('connection-test/', views.TestConnection.as_view(), name='test_connection'),
    path('csrf_token/', views.GetCSRFToken.as_view(), name='get_csrf_token'),
]