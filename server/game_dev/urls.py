from django.urls import path
from .views import EventDetailAPIView

urlpatterns = [
    path("events/<int:pk>/", EventDetailAPIView.as_view()),
]
