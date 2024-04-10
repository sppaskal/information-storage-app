from django.urls import path
from .views import (
    login_view,
    singup_view,
    accounts_view,
)

urlpatterns = [
    path('login/', login_view, name='login'),
    path('signup/', singup_view, name='signup'),
    path('accounts/', accounts_view, name='accounts')
]
