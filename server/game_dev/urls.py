from django.urls import path
from .views import EventDetailAPIView, CommitteeAPIView

urlpatterns = [
    path("events/<int:id>/", EventDetailAPIView.as_view()),
    path("about/", CommitteeAPIView.as_view())
]
