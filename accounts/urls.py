from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('connection-test/', views.TestConnection.as_view(), name='test_connection'),
    path('add/', views.AddAccount.as_view(), name='add_account'),
    
]