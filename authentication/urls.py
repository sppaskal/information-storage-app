from django.urls import path
from . import views

app_name = 'authentication'

urlpatterns = [
    path('connection-test/', views.TestConnection.as_view(), name='test_connection'),
    path('login/', views.Login.as_view(), name='login'),
]