# from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Event, Art
from .serializers import EventSerializer, ArtSerializer


class EventDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/events/<id>/
    """
    serializer_class = EventSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Event.objects.filter(id=self.kwargs["id"])


class ArtDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/artworks/<id>/
    """
    serializer_class = ArtSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Art.objects.filter(id=self.kwargs["id"])
