from rest_framework import serializers
from questionnaire.models import CareerQuestion, CareerRecommendation


class CareerQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerQuestion
        fields = '__all__'


class CareerRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerRecommendation
        fields = '__all__'
