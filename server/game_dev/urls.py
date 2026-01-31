from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import EventListAPIView, EventDetailAPIView, FeatureArtAPIView, GamesDetailAPIView, GameshowcaseAPIView, MemberAPIView

router = DefaultRouter()

urlpatterns = [
    path("events/", EventListAPIView.as_view(), name="events-list"),
    path("events/<int:id>/", EventDetailAPIView.as_view()),
    path('arts/featured/', FeatureArtAPIView.as_view()),
    path("games/<int:id>/", GamesDetailAPIView.as_view()),
    path("gameshowcase/", GameshowcaseAPIView.as_view(), name="gameshowcase-api"),  # Updated line for GameShowcase endpoint
    path('members/<int:id>/', MemberAPIView.as_view())
] + router.urls
