from rest_framework import serializers
from .models import Game


class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'name', 'description', 'completion', 'active', 'hostURL', 'isItch', 'pathToThumbnail', 'event')
