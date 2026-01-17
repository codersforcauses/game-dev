from rest_framework import serializers
from .models import Event, Art, ArtContributor, Member


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


class ArtContributorSerializer(serializers.ModelSerializer):
    member_name = serializers.CharField(source='member.name', read_only=True)
    art_id = serializers.IntegerField(source='art.id', read_only=True)

    class Meta:
        model = ArtContributor
        fields = ['id', 'art_id', 'member', 'member_name', 'role']


class ArtSerializer(serializers.ModelSerializer):
    contributors = ArtContributorSerializer(many=True, read_only=True)

    class Meta:
        model = Art
        fields = ['id', 'name', 'description', 'media', 'active', 'contributors']


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            "name",
            "profile_picture",
            "about",
            "pronouns"
        ]
