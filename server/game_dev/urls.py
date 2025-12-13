from django.urls import path
from .views import EventListAPIView, EventDetailAPIView

urlpatterns = [
    path("events/", EventListAPIView.as_view()),
    path("events/<int:id>/", EventDetailAPIView.as_view()),
]
