from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    AccessCode,
)

# -------------------------------------------------------------------


class AccessCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessCode
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    # Overriding validate() to check if email is unique
    def validate(self, attrs):
        if User.objects.filter(email=attrs.get('email')).exists():
            raise serializers.ValidationError(
                "A user with that email already exists."
            )

        return attrs
