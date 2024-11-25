# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from api.views import *

# Swagger/OpenAPI schema view configuration
schema_view = get_schema_view(
    openapi.Info(
        title="Student Information Portal API",
        default_version='v1',
        description="API documentation for the Student Information Portal",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(AllowAny,),
)

# Create and register view sets with the router
router = DefaultRouter()
router.register(r'auth/register', UserViewSet, basename='register')
router.register(r'universities', UniversityViewSet)
router.register(r'students', StudentViewSet)
router.register(r'scholarships', ScholarshipViewSet)
router.register(r'users', UserViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Include URLs from the api app
    path('questionnaire/', include('questionnaire.urls')),  # Include URLs from the questionnaire app
    path('universities/', include('universities.urls')),  # Include URLs from the universities app
    path('scholarships/', include('scholarships.urls')),  # Include URLs from the students app
    path('auth/', include('rest_framework.urls')),  # Include default auth URLs
    path('auth/token/', CustomAuthToken.as_view(), name='auth-token'),  # Custom auth token view
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]