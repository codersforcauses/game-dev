from django.urls import path
from .views import EventDetailAPIView, MemberDetailAPIView

urlpatterns = [
    path("events/<int:id>/", EventDetailAPIView.as_view()),
    path("members/<int:id>/", MemberDetailAPIView.as_view())
]
