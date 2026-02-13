from rest_framework import serializers
from .models import Event, Game, Member, GameShowcase, GameContributor, SocialMedia


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
    # to link contributors to their member/[id] page
    member_id = serializers.IntegerField(source="member.id")
    name = serializers.CharField(source="member.name")
    social_media = serializers.SerializerMethodField()

    class Meta:
        model = GameContributor
        fields = ("member_id", "name", "role", "social_media")

    def get_social_media(self, obj):
        social_links = obj.member.social_media_links.all()
        return SocialMediaSerializer(social_links, many=True).data


class GamesSerializer(serializers.ModelSerializer):
    contributors = GameContributorSerializer(
        many=True,
        source="game_contributors",
        read_only=True
    )

    class Meta:
        model = Game
        fields = ('id', 'name', 'description', 'completion', 'active',
                  'hostURL', 'itchEmbedID', 'thumbnail', 'event', "contributors")


# Contributor serializer for name and role

class ShowcaseContributorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='member.name', read_only=True)
    role = serializers.CharField(read_only=True)
    social_media = serializers.SerializerMethodField()

    class Meta:
        model = GameContributor
        fields = ("name", "role", "social_media")

    def get_social_media(self, obj):
        social_links = obj.member.social_media_links.all()
        return SocialMediaSerializer(social_links, many=True).data


# Serializer for GameShowcase
class GameshowcaseSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField(source='game.id', read_only=True)
    game_name = serializers.CharField(source='game.name', read_only=True)
    game_description = serializers.CharField(
        source='game.description', read_only=True)
    game_cover_thumbnail = serializers.ImageField(
        source='game.thumbnail', read_only=True)
    contributors = serializers.SerializerMethodField()

    class Meta:
        model = GameShowcase
        fields = ('game_id', 'game_name', 'game_description',
                  'description', 'contributors', 'game_cover_thumbnail')

    def get_contributors(self, obj):
        # Always fetch contributors from GameContributor for the related game
        contributors = GameContributor.objects.filter(game=obj.game)
        return ShowcaseContributorSerializer(contributors, many=True).data


class ContributorGameDataSerializer(serializers.ModelSerializer):
    # Serializes data in Game model to display on a contributor's profile.

    class Meta:
        model = Game
        fields = ('name', 'thumbnail',
                  'description')


class ContributorGameSerializer(serializers.ModelSerializer):
    # Matches games in the GameContributor model to the information about them in the Game model.
    game_id = serializers.IntegerField(source='game.id', read_only=True)
    role = serializers.CharField(read_only=True)
    game_data = serializers.SerializerMethodField()

    class Meta:
        model = GameContributor
        fields = ['game_id', 'role', 'game_data']

    def get_game_data(self, obj):
        game_data = Game.objects.get(id=obj.game_id)
        return ContributorGameDataSerializer(game_data).data
class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = [
            "link",
            "socialMediaUserName",
        ]


class MemberSerializer(serializers.ModelSerializer):
    social_media = SocialMediaSerializer(
        many=True, source="social_media_links", read_only=True)

    class Meta:
        model = Member
        fields = [
            "name",
            "profile_picture",
            "about",
            "pronouns",
            "social_media",
        ]
