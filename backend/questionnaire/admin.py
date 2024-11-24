from django.contrib import admin
from .models import CareerQuestion, CareerRecommendation, UserResponse

admin.site.register(CareerQuestion)
admin.site.register(CareerRecommendation)
admin.site.register(UserResponse)
