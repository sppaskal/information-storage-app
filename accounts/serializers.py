from rest_framework import serializers
from .models import (
    Account,
    Type
)

# -------------------------------------------------------------------------------


class AccountSerializer(serializers.ModelSerializer):
    type_name = serializers.SlugRelatedField(
        source='type',
        slug_field='name',
        read_only=True
    )

    class Meta:
        model = Account
        fields = '__all__'


class AccountUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            'email',
            'username',
            'password',
            'company',
            'website',
            'description',
            'type',
        )

# -------------------------------------------------------------------------------


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'


class TypeUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ('name',)

# -------------------------------------------------------------------------------
