from dataclasses import fields
from statistics import mode
from rest_framework import serializers
from .models import *

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id','created_at','updated_at','title','owners']

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id','created_at','updated_at','name','data','level','document']

    def validate(self, attrs):
        print("Hello")
        return super().validate(attrs)
        
    def create(self, validated_data):
        return Section.objects.create(**validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name','last_name']