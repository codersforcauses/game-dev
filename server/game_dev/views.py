from django.shortcuts import render

from rest_framework import viewsets
from .serializers import GamesSerializer
from .models import Games


# Create your views here.
class GamesView(viewsets.ModelViewSet):
    serializer_class = GamesSerializer
    queryset = Games.objects.all()
