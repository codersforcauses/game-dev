from rest_framework import generics
from .serializers import GamesSerializer, GameshowcaseSerializer, EventSerializer, MemberSerializer, ArtSerializer
from .models import Game, GameShowcase, Event, Member, Committee, Art
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination


class GamesDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/games/<id>/
    """
    serializer_class = GamesSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Game.objects.filter(id=self.kwargs["id"])


class EventPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


class EventListAPIView(generics.ListAPIView):
    """
    GET /api/events/
    Returns a paginated list of events (optionally filtered by time)
    """
    serializer_class = EventSerializer
    pagination_class = EventPagination

    def get_queryset(self):
        qs = Event.objects.all()
        type_param = self.request.query_params.get("type")
        now = timezone.now()

        # Default to upcoming when type is missing/empty
        if not type_param:
            return qs.filter(date__gte=now).order_by("date")

        if type_param == "past":
            return qs.filter(date__lt=now).order_by("-date")

        if type_param == "upcoming":
            return qs.filter(date__gte=now).order_by("date")

        raise ValidationError(
            {"type": "Invalid value. Use 'past' or 'upcoming'."})


class EventDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/events/<id>/
    """
    serializer_class = EventSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Event.objects.filter(id=self.kwargs["id"])


class GameshowcaseAPIView(APIView):
    def get(self, request):
        showcases = GameShowcase.objects.all()
        serializer = GameshowcaseSerializer(showcases, many=True)
        return Response(serializer.data)


class MemberAPIView(generics.RetrieveAPIView):
    serializer_class = MemberSerializer
    lookup_field = "id"

    def get_queryset(self):
        return Member.objects.filter(active=True)


class CommitteeAPIView(generics.ListAPIView):
    serializer_class = MemberSerializer

    def get_queryset(self):
        outputList = []
        roleOrder = ("P", "VP", "SEC", "TRE", "MARK", "EVE", "PRO", "FRE")
        placeholderMember = {"name": "Position not filled", "profile_picture": "url('/landing_placeholder.png')",
                             "about": "", "pronouns": "", "pk": 0}
        for i in roleOrder:
            try:
                cur = Committee.objects.get(role=i).id
                if cur.active:
                    outputList.append(cur)
                else:
                    outputList.append(placeholderMember)
            except Committee.DoesNotExist:
                outputList.append(placeholderMember)
        return outputList


class ArtDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/artworks/<id>/
    """
    serializer_class = ArtSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Art.objects.filter(id=self.kwargs["id"])


class FeatureArtAPIView(generics.ListAPIView):
    """
    GET /api/arts/featured/
    """
    serializer_class = ArtSerializer

    def get_queryset(self):
        return Art.objects.filter(showcase__isnull=False)
