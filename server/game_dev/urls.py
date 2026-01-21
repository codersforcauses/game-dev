from django.urls import path
from .views import EventListAPIView, EventDetailAPIView, CommitteeAPIView

urlpatterns = [
    path("events/", EventListAPIView.as_view(), name="events-list"),
    path("events/<int:id>/", EventDetailAPIView.as_view()),
    path("about/", CommitteeAPIView.as_view())
]
