from django.db import models
from django.contrib.auth.models import User


class AccessCode(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.IntegerField(null=True)
    used = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
