from django.urls import path
from .views import test
from . import views

app_name = 'accounts'

urlpatterns = [
    path('test/', test, name='test_connection'),
    path('add/', views.AddAccount.as_view(), name='add_account'),
    
]