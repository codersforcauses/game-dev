from django.urls import path
from .views import EventDetailAPIView, MemberAPIView

urlpatterns = [
    path("events/<int:id>/", EventDetailAPIView.as_view()),
    path('members/<int:id>/', MemberAPIView.as_view())
]
