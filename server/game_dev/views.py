from rest_framework import viewsets, generics
from .serializers import GamesSerializer, GameshowcaseSerializer, EventSerializer
from .models import Game, GameShowcase
import urllib.request
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Event


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


class GameshowcaseView(viewsets.ModelViewSet):
    serializer_class = GameshowcaseSerializer
    queryset = GameShowcase.objects.all()
