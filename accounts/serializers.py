from rest_framework import serializers
from .models import (
    Account,
    Type
)


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

# -------------------------------------------------------------------


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'


class TypeUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ('name',)

# -------------------------------------------------------------------