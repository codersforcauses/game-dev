from django.urls import path
from .views import EventListAPIView, EventDetailAPIView, GamesDetailAPIView, GameshowcaseAPIView, MemberAPIView, CommitteeAPIView, FeatureArtAPIView

urlpatterns = [
    path("events/", EventListAPIView.as_view(), name="events-list"),
    path("events/<int:id>/", EventDetailAPIView.as_view()),
    path('arts/featured/', FeatureArtAPIView.as_view()),
    path("games/<int:id>/", GamesDetailAPIView.as_view()),
    path("gameshowcase/", GameshowcaseAPIView.as_view(), name="gameshowcase-api"),  # Updated line for GameShowcase endpoint
    path('members/<int:id>/', MemberAPIView.as_view()),
    path("about/", CommitteeAPIView.as_view())
]
