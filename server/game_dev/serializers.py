from rest_framework import serializers
from .models import Art, ArtContributor, Member


class ArtContributorSerializer(serializers.ModelSerializer):
    member_name = serializers.CharField(source='member.name', read_only=True)
    art_id = serializers.IntegerField(source="art.id", read_only=True)
    
    class Meta:
        model = ArtContributor
        fields = ['id', 'art', 'art_id', 'member', 'member_name', 'role']

class ArtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Art
        fields = ['id', 'name', 'description', 'path_to_media', 'active']

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['name']
