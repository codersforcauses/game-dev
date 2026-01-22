from rest_framework import generics
from .serializers import GamesSerializer
from .models import Game
import urllib.request
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Event
from .serializers import EventSerializer
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


class GamesDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/games/<id>/
    """
    serializer_class = GamesSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Game.objects.filter(id=self.kwargs["id"])


@csrf_exempt
def itch_embed_proxy(request, embed_id):
    url = f"https://itch.io/embed/{embed_id}"
    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            html = response.read().decode("utf-8")
        return JsonResponse({"html": html})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


class EventDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/events/<id>/
    """
    serializer_class = EventSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Event.objects.filter(id=self.kwargs["id"])
