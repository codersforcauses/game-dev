from django.urls import path
from .views import ContributorGamesListAPIView, EventListAPIView, EventDetailAPIView
from .views import GamesDetailAPIView, GameshowcaseAPIView, MemberAPIView, CommitteeAPIView

urlpatterns = [
    path("events/", EventListAPIView.as_view(), name="events-list"),
    path("events/<int:id>/", EventDetailAPIView.as_view()),
    path("games/<int:id>/", GamesDetailAPIView.as_view()),
    # Updated line for GameShowcase endpoint
    path("gameshowcase/", GameshowcaseAPIView.as_view(), name="gameshowcase-api"),
    path('members/<int:id>/', MemberAPIView.as_view()),
    path("about/", CommitteeAPIView.as_view()),
    path("games/contributor/<int:member>/",
         ContributorGamesListAPIView.as_view()),
    # Updated line for GameShowcase endpoint
    path("gameshowcase/", GameshowcaseAPIView.as_view(), name="gameshowcase-api"),
    path('members/<int:id>/', MemberAPIView.as_view())
]
