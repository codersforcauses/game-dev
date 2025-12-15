from rest_framework import viewsets
from .serializers import GamesSerializer
from .models import Game
import urllib.request
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


class GamesView(viewsets.ModelViewSet):
    serializer_class = GamesSerializer
    queryset = Game.objects.all()


@csrf_exempt
def itch_embed_proxy(request, embed_id):
    url = f"https://itch.io/embed/{embed_id}"
    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            html = response.read().decode("utf-8")
        return JsonResponse({"html": html})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)