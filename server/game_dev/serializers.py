from rest_framework import serializers
from .models import Art, ArtContributor, Member


class ArtContributorSerializer(serializers.ModelSerializer):
    member_name = serializers.CharField(source='member.name', read_only=True)

    class Meta:
        model = ArtContributor
        fields = ['id', 'art', 'member', 'member_name', 'role']


class ArtSerializer(serializers.ModelSerializer):
    contributors = ArtContributorSerializer(many=True, read_only=True)

    class Meta:
        model = Art
        fields = ['id', 'name', 'description', 'path_to_media', 'active', 'contributors']


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['name']
