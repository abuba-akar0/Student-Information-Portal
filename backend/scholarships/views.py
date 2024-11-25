# scholarships/views.py
from rest_framework import generics
from .models import Scholarship
from .serializers import ScholarshipSerializer


class ScholarshipListView(generics.ListCreateAPIView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', None)  # Get search query from request
        if query:
            return Scholarship.objects.filter(
                title__icontains=query  # Case-insensitive search by title
            )
        return Scholarship.objects.all()