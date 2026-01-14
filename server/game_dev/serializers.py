from rest_framework import serializers
from .models import Event
from .models import Game, GameContributors


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


# This is child serializer of GameSerializer
class GameContributorSerializer(serializers.ModelSerializer):
    member_id = serializers.IntegerField(source="member.id")  # to link contributors to their member/[id] page
    name = serializers.CharField(source="member.name")

    class Meta:
        model = GameContributors
        fields = ("member_id", "name", "role")


class GamesSerializer(serializers.ModelSerializer):
    contributors = GameContributorSerializer(
        many=True,
        source="game_contributors",
        read_only=True
    )

    class Meta:
        model = Game
        fields = ('id', 'name', 'description', 'completion', 'active', 'hostURL', 'isItch', 'pathToThumbnail', 'event', "contributors")
