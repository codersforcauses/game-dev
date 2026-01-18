# from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Event, Member
from .serializers import EventSerializer, MemberSerializer


class EventDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/events/<id>/
    """
    serializer_class = EventSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Event.objects.filter(id=self.kwargs["id"])


class MemberAPIView(generics.RetrieveAPIView):
    serializer_class = MemberSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Member.objects.filter(id=self.kwargs["id"])
