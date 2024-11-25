# universities/urls.py
from django.urls import path
from .views import UniversityListView


urlpatterns = [
    path('university/', UniversityListView.as_view(), name='university-list'),
]
