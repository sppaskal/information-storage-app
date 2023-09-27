from django.db import models

# Create your models here.
class Account(models.Model):
    email = models.EmailField(max_length=254, blank=True)
    username = models.CharField(max_length=254, blank=True)
    password = models.CharField(max_length=254) # Will be encrypted in future
    company = models.CharField(max_length=254, blank=True)
    website = models.URLField(blank=True)
    description = models.TextField(blank=True)
    # type = foreign key to a Type table (ex: gaming, banking, work, ect)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)