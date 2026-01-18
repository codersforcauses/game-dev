# from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Event, Committee
from .serializers import EventSerializer, MemberSerializer

class EventDetailAPIView(generics.RetrieveAPIView):
    """
    GET /api/events/<id>/
    """
    serializer_class = EventSerializer
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return Event.objects.filter(id=self.kwargs["id"])
    
class CommitteeAPIView(generics.ListAPIView):
    serializer_class = MemberSerializer
    
    def get_queryset(self):
        outputList = []
        roleOrder =("P", "VP", "SEC", "TRE", "MARK", "EVE", "PRO", "FRE")
        for i in roleOrder:
            try:
                outputList.append(Committee.objects.get(role=i).id)
            except:
                outputList.append({"name":"Position not filled", "profile_picture":"", "about": "", "pronouns":""})
        return outputList
