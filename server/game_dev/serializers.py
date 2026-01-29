from rest_framework import serializers
from .models import Event, Member


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


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            "name",
            "profile_picture",
            "about",
            "pronouns",
        ]
