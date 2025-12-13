# from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Event
from .serializers import EventSerializer


class EventDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/events/<id>/
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
