from django.db import models
from cryptography.fernet import Fernet

SECRET_KEY = b'secret_key'
fernet = Fernet(SECRET_KEY)

# Create your models here.
class Account(models.Model):
    email = models.EmailField(max_length=254, blank=True)
    username = models.CharField(max_length=254, blank=True)
    password = models.CharField(max_length=254)
    company = models.CharField(max_length=254, blank=True)
    website = models.URLField(blank=True)
    description = models.TextField(blank=True)
    # type = foreign key to a Type table (ex: gaming, banking, work, ect)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.password:
            # Encrypt the password before saving
            self.encrypted_password = fernet.encrypt(self.password.encode('utf-8'))
        super(Account, self).save(*args, **kwargs)

    def decrypt_password(self):
        # Decrypt and return the password
        return fernet.decrypt(self.encrypted_password).decode('utf-8')