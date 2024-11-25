# universities/views.py
from rest_framework import generics
from .models import University
from .serializers import UniversitySerializer


class UniversityListView(generics.ListCreateAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', None)  # Get search query from request
        if query:
            return University.objects.filter(
                name__icontains=query  # Case-insensitive search by name
            )
        return University.objects.all()
