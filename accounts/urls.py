from django.urls import path
from .views import test

app_name = 'accounts'

urlpatterns = [
    path('test/', test, name='test'),
]