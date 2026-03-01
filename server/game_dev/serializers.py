from rest_framework import serializers
from .models import ArtShowcase, Event, Game, Art, ArtContributor, Member, GameShowcase, GameContributor, SocialMedia


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "date",
            "description",
            "publicationDate",
            "coverImage",
            "location",
            "workshopLink",
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
        many=True, source="game_contributors", read_only=True
    )

    class Meta:
        model = Game
        fields = (
            "id",
            "name",
            "description",
            "completion",
            "active",
            "hostURL",
            "itchEmbedID",
            "thumbnail",
            "event",
            "itchGamePlayableID",
            "itchGameWidth",
            "itchGameHeight",
            "contributors",
        )


# Contributor serializer for name and role


class ShowcaseContributorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="member.name", read_only=True)
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
    game_id = serializers.IntegerField(source="game.id", read_only=True)
    game_name = serializers.CharField(source="game.name", read_only=True)
    game_description = serializers.CharField(source="game.description", read_only=True)
    game_cover_thumbnail = serializers.ImageField(
        source="game.thumbnail", read_only=True
    )
    contributors = serializers.SerializerMethodField()

    class Meta:
        model = GameShowcase
        fields = (
            "game_id",
            "game_name",
            "game_description",
            "description",
            "contributors",
            "game_cover_thumbnail",
        )

    def get_contributors(self, obj):
        # Always fetch contributors from GameContributor for the related game
        contributors = GameContributor.objects.filter(game=obj.game)
        return ShowcaseContributorSerializer(contributors, many=True).data


class ContributorGameSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField(source='game.id', read_only=True)
    role = serializers.CharField(read_only=True)
    game_data = serializers.SerializerMethodField()

    class Meta:
        model = GameContributor
        fields = ['game_id', 'role', 'game_data']

    def get_game_data(self, obj):
        game = obj.game
        request = self.context.get('request')
        return {
            'name': game.name,
            'description': game.description,
            'thumbnail': request.build_absolute_uri(game.thumbnail.url) if game.thumbnail and request else None
        }


class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = [
            "link",
            "socialMediaUserName",
        ]


class MemberSerializer(serializers.ModelSerializer):
    social_media = SocialMediaSerializer(
        many=True, source="social_media_links", read_only=True
    )

    class Meta:
        model = Member
        fields = [
            "name",
            "profile_picture",
            "about",
            "pronouns",
            "social_media",
            "pk"
        ]


class ArtContributorSerializer(serializers.ModelSerializer):
    member_id = serializers.IntegerField(source='member.id', read_only=True)
    member_name = serializers.CharField(source='member.name', read_only=True)

    class Meta:
        model = ArtContributor
        fields = ['id', 'member_id', 'member_name', 'role']


class ArtSerializer(serializers.ModelSerializer):
    art_id = serializers.IntegerField(source='id', read_only=True)
    source_game_id = serializers.IntegerField(source='source_game.id', read_only=True)
    source_game_name = serializers.CharField(source='source_game.name', read_only=True)
    contributors = ArtContributorSerializer(many=True, read_only=True)
    showcase_description = serializers.SerializerMethodField()

    class Meta:
        model = Art
        fields = ['art_id', 'name', 'description', 'media', 'active', 'source_game_id', 'source_game_name', 'contributors', 'showcase_description']

    def get_showcase_description(self, obj):
        showcase = obj.showcase.first()
        return showcase.description if showcase else None


class ArtShowcaseSerializer(serializers.ModelSerializer):
    art_name = serializers.CharField(source='art.name', read_only=True)

    class Meta:
        model = ArtShowcase
        fields = ['id', 'description', 'art', 'art_name']
