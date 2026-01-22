from django.urls import path
from .views import EventListAPIView, EventDetailAPIView, GamesDetailAPIView, itch_embed_proxy

urlpatterns = [
    path("events/", EventListAPIView.as_view(), name="events-list"),
    path("events/<int:id>/", EventDetailAPIView.as_view()),
    path("games/<int:id>/", GamesDetailAPIView.as_view()),
    path("itch-embed/<str:embed_id>/", itch_embed_proxy),
]
