from rest_framework import viewsets
from .models import Art, ArtContributor, Member
from .serializers import ArtContributorSerializer, ArtSerializer, MemberSerializer
from django_filters.rest_framework import DjangoFilterBackend


class ArtContributorViewSet(viewsets.ModelViewSet):
    queryset = ArtContributor.objects.all()
    serializer_class = ArtContributorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['art']


class ArtViewSet(viewsets.ModelViewSet):
    queryset = Art.objects.all()
    serializer_class = ArtSerializer


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
