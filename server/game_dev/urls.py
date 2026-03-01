from django.urls import path
from .views import ContributorGamesListAPIView, (
    EventListAPIView, EventDetailAPIView
from .views import GamesDetailAPIView,
    GameshowcaseAPIView, MemberAPIView, CommitteeAPIView,
    FeatureArtAPIView, ArtDetailAPIView
)

urlpatterns = [
    path("events/", EventListAPIView.as_view(), name="events-list"),
    path("events/<int:id>/", EventDetailAPIView.as_view()),
    path('arts/featured/', FeatureArtAPIView.as_view()),
    path('arts/<int:id>/', ArtDetailAPIView.as_view(), name='art-detail'),
    path("games/<int:id>/", GamesDetailAPIView.as_view()),
    path("games/contributor/<int:member>/",
         ContributorGamesListAPIView.as_view()),
    # Updated line for GameShowcase endpoint
    path("gameshowcase/", GameshowcaseAPIView.as_view(), name="gameshowcase-api"),
    path('members/<int:id>/', MemberAPIView.as_view()),
    path("about/", CommitteeAPIView.as_view()),
    path('members/<int:id>/', MemberAPIView.as_view())
]
