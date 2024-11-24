from rest_framework import serializers
from scholarships.models import Scholarship


class ScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = '__all__'
