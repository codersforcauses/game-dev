from rest_framework import serializers
from .models import Event, Game, Member, GameShowcase, GameContributor


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
        model = GameContributor
        fields = ("member_id", "name", "role")


class GamesSerializer(serializers.ModelSerializer):
    contributors = GameContributorSerializer(
        many=True,
        source="game_contributors",
        read_only=True
    )

    class Meta:
        model = Game
        fields = ('id', 'name', 'description', 'completion', 'active', 'hostURL', 'isItch', 'itchEmbedID', 'pathToThumbnail', 'event', "contributors")


# Contributor serializer for name and role
class ShowcaseContributorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='member.name', read_only=True)
    role = serializers.CharField(read_only=True)
    # social_links = serializers.CharField(source='member.social_links', read_only=True)
    # socialmedia_name = serializers.CharField(source='member.socialmedia_name', read_only=True)

    class Meta:
        model = GameContributor
        fields = ("name", "role")


# Serializer for GameShowcase
class GameshowcaseSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField(source='game.id', read_only=True)
    game_name = serializers.CharField(source='game.name', read_only=True)
    game_description = serializers.CharField(source='game.description', read_only=True)
    game_cover_thumbnail = serializers.ImageField(source='game.pathToThumbnail', read_only=True)
    contributors = serializers.SerializerMethodField()

    class Meta:
        model = GameShowcase
        fields = ('game_id', 'game_name', 'game_description', 'description', 'contributors', 'game_cover_thumbnail')

    def get_contributors(self, obj):
        # Always fetch contributors from GameContributor for the related game
        contributors = GameContributor.objects.filter(game=obj.game)
        return ShowcaseContributorSerializer(contributors, many=True).data


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            "name",
            "profile_picture",
            "about",
            "pronouns"
        ]
