from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import EventDetailAPIView

router = DefaultRouter()

urlpatterns = [
    path("events/<int:id>/", EventDetailAPIView.as_view()),
] + router.urls
