from django.db import models
import bcrypt

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

    def save(self, *args, **kwargs):
        # Hash the password before saving
        if self.password:
            self.password = bcrypt.hashpw(self.password.encode('utf-8'), bcrypt.gensalt())
        super(Account, self).save(*args, **kwargs)