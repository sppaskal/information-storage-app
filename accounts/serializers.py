from rest_framework import serializers
from utils.formatting import Formatting
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

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['date_created'] = Formatting.format_date(instance.date_created)
        representation['date_updated'] = Formatting.format_date(instance.date_updated)
        return representation


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
