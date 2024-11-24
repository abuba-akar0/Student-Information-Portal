from .views import CareerQuestionViewSet, CareerRecommendationAPI
from django.urls import path
from django.contrib import admin

urlpatterns = [
    path('questions/', CareerQuestionViewSet.as_view({'get': 'list'}), name='questions'),
    path('recommendation/', CareerRecommendationAPI.as_view(), name='recommendation'),
]
