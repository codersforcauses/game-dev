from rest_framework import generics
from .serializers import GamesSerializer, GameshowcaseSerializer, EventSerializer
from .models import Game, GameShowcase
import urllib.request
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Event
from rest_framework.views import APIView
from rest_framework.response import Response


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


class GameshowcaseAPIView(APIView):
    def get(self, request):
        showcases = GameShowcase.objects.all()
        serializer = GameshowcaseSerializer(showcases, many=True)
        return Response(serializer.data)
