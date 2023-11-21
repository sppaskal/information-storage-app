from django.urls import path
from .views import login_initial_view

urlpatterns = [
    path('login/', login_initial_view, name='login'),
]
