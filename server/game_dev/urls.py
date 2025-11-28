from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArtContributorViewSet

router = DefaultRouter()
router.register(r'art-contributors', ArtContributorViewSet, basename='artcontributor')

urlpatterns = [
    path('', include(router.urls)),
]