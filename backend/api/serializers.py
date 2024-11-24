from datetime import timezone

from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from .models import *


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Student
        fields = ['id', 'user', 'name', 'date_of_birth', 'phone', 'email', 'date_created']

    def validate_email(self, value):
        if Student.objects.filter(email=value).exists():
            raise serializers.ValidationError("A student with this email already exists.")
        return value

class ScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = ['id', 'name', 'eligibility_criteria', 'deadline', 'description']

    def validate_deadline(self, value):
        if value < timezone.now().date():
            raise serializers.ValidationError("Deadline cannot be in the past.")
        return value


class UniversitySerializer(serializers.ModelSerializer):
    scholarship_available = ScholarshipSerializer()

    class Meta:
        model = University
        fields = ['id', 'name', 'location', 'courses_offered', 'scholarship_available']

    def validate_name(self, value):
        if University.objects.filter(name=value).exists():
            raise serializers.ValidationError("A university with this name already exists.")
        return value
