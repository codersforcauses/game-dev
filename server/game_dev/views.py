from rest_framework import viewsets
from .models import ArtContributor
from .serializers import ArtContributorSerializer


class ArtContributorViewSet(viewsets.ModelViewSet):
    queryset = ArtContributor.objects.all()
    serializer_class = ArtContributorSerializer