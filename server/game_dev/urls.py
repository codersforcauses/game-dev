from django.urls import path
from .views import EventDetailAPIView

urlpatterns = [
    path("events/<int:id>/", EventDetailAPIView.as_view()),
]
