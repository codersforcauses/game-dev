from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventDetailAPIView, ArtContributorViewSet, ArtViewSet, MemberViewSet

router = DefaultRouter()
router.register(r'art-contributors', ArtContributorViewSet, basename='artcontributor')
router.register(r'arts', ArtViewSet, basename="art")
router.register(r'members', MemberViewSet, basename="member")

urlpatterns = [
    path("events/<int:id>/", EventDetailAPIView.as_view()),
    path('', include(router.urls)),
]
