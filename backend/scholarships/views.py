from rest_framework import viewsets
from scholarships.models import Scholarship
from scholarships.serializers import ScholarshipSerializer


class ScholarshipViewSet(viewsets.ModelViewSet):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer
