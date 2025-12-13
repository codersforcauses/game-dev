# from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Event
from .serializers import EventSerializer


class EventListAPIView(generics.ListAPIView):
    """
    GET /api/events/
    Returns a list of all events
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/events/<id>/
    """
    serializer_class = EventSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Event.objects.filter(id=self.kwargs["id"])
