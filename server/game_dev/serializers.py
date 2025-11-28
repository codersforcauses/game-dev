from rest_framework import serializers
from .models import ArtContributor


class ArtContributorSerializer(serializers.ModelSerializer):
    member_name = serializers.CharField(source='member.name', read_only=True)
    art_name = serializers.CharField(source='art.name', read_only=True)
    
    class Meta:
        model = ArtContributor
        fields = ['id', 'art', 'member', 'member_name', 'art_name', 'role']