# from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Event
from .serializers import EventSerializer
from django.utils import timezone
from rest_framework.exceptions import ValidationError


class EventListAPIView(generics.ListAPIView):
    """
    GET /api/events/
    Returns a list of events (optionally filtered by time)
    """
    serializer_class = EventSerializer

    def get_queryset(self):
        qs = Event.objects.all()
        type_param = self.request.query_params.get("type")

        now = timezone.now()

        if type_param is None or type_param == "":
            return qs.order_by("date")

        if type_param == "past":
            return qs.filter(date__lt=now).order_by("-date")

        if type_param == "upcoming":
            return qs.filter(date__gte=now).order_by("date")

        raise ValidationError(
            {"type": "Invalid value. Use 'past' or 'upcoming'."})


class EventDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/events/<id>/
    """
    serializer_class = EventSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Event.objects.filter(id=self.kwargs["id"])
