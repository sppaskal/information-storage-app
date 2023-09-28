from rest_framework import serializers
from .models import Account

# Serializer for your Account model
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'