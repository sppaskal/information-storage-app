from django.db import models
from django_cryptography.fields import encrypt


class Type(models.Model):
    name = models.CharField(max_length=254, unique=True)

# -------------------------------------------------------------------------------


class Account(models.Model):
    email = models.EmailField(max_length=254, blank=True)
    username = models.CharField(max_length=254, blank=True)
    password = encrypt(models.CharField(max_length=254))
    company = models.CharField(max_length=254, blank=True)
    website = models.URLField(blank=True)
    description = models.TextField(blank=True)
    type = models.ForeignKey(Type, null=True, on_delete=models.SET_NULL)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

# -------------------------------------------------------------------------------
