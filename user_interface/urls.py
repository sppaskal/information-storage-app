from django.urls import path
from .views import (
    login_view,
    accounts_view,
)

urlpatterns = [
    path('login/', login_view, name='login'),
    path('accounts/', accounts_view, name='accounts')
]
