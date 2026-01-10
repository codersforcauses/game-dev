# from django.shortcuts import render

# Create your views here.
from rest_framework import generics, viewsets
from .models import Event, Art, ArtContributor, Member
from .serializers import EventSerializer, ArtContributorSerializer, ArtSerializer, MemberSerializer
from django_filters.rest_framework import DjangoFilterBackend


class EventDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/events/<id>/
    """
    serializer_class = EventSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Event.objects.filter(id=self.kwargs["id"])


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
