from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Vol, Vol2, Application

class VolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vol
        fields = ['id', 'title', 'desc', 'image']

class Vol2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Vol2
        fields = ['id', 'title', 'desc', 'image']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)  # исправлено User.objects
        return user

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['user', 'created_at']