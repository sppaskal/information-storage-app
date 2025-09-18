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

# -------------------------------------------------------------------


class UserSerializer(serializers.ModelSerializer):
    mfa_enabled = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'mfa_enabled']
        extra_kwargs = {'password': {'write_only': True}}

    # Overriding validate() to check if email is unique
    def validate(self, attrs):
        if User.objects.filter(email=attrs.get('email')).exists():
            raise serializers.ValidationError(
                "A user with that email already exists."
            )

        return attrs


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_email(self, value):
        user = self.instance
        if User.objects.filter(email=value).exclude(pk=user.pk).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            instance.set_password(validated_data.pop('password'))
        return super().update(instance, validated_data)