from django.shortcuts import render

from rest_framework import viewsets
from .serializers import GamesSerializer
from .models import Game


# Create your views here.
class GamesView(viewsets.ModelViewSet):
    serializer_class = GamesSerializer
    queryset = Game.objects.all()
