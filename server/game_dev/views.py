# from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Event, Committee
from .serializers import EventSerializer, MemberSerializer
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination


class EventPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


class EventListAPIView(generics.ListAPIView):
    """
    GET /api/events/
    Returns a paginated list of events (optionally filtered by time)
    """
    serializer_class = EventSerializer
    pagination_class = EventPagination

    def get_queryset(self):
        qs = Event.objects.all()
        type_param = self.request.query_params.get("type")
        now = timezone.now()

        # Default to upcoming when type is missing/empty
        if not type_param:
            return qs.filter(date__gte=now).order_by("date")

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


class CommitteeAPIView(generics.ListAPIView):
    serializer_class = MemberSerializer
    
    def get_queryset(self):
        outputList = []
        roleOrder = ("P", "VP", "SEC", "TRE", "MARK", "EVE", "PRO", "FRE")
        for i in roleOrder:
            try:
                outputList.append(Committee.objects.get(role=i).id)
            except:
                outputList.append({"name": "Position not filled", "profile_picture": "", "about": "", "pronouns": ""})
        return outputList
