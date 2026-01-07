from rest_framework import serializers
from .models import Event
from .models import Game


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "date",
            "description",
            "publicationDate",
            "cover_image",
            "location",
        ]


class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'name', 'description', 'completion', 'active', 'hostURL', 'isItch', 'pathToThumbnail', 'event')
