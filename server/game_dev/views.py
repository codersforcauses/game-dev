from rest_framework import generics, viewsets
from .models import Event, Art, ArtContributor, Member
from .serializers import EventSerializer, ArtContributorSerializer, ArtSerializer, MemberSerializer


class EventDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/events/<id>/
    """
    serializer_class = EventSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Event.objects.filter(id=self.kwargs["id"])


class ArtContributorViewSet(viewsets.ModelViewSet):
    queryset = ArtContributor.objects.all()
    serializer_class = ArtContributorSerializer


class ArtViewSet(viewsets.ModelViewSet):
    queryset = Art.objects.all()
    serializer_class = ArtSerializer


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

