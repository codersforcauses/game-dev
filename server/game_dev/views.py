from rest_framework import viewsets
from .models import Art, ArtContributor, Member
from .serializers import ArtContributorSerializer, ArtSerializer, MemberSerializer


class ArtContributorViewSet(viewsets.ModelViewSet):
    queryset = ArtContributor.objects.all()
    serializer_class = ArtContributorSerializer

class ArtViewSet(viewsets.ModelViewSet):
    queryset = Art.objects.all()
    serializer_class = ArtSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer