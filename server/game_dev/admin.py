from django.contrib import admin
from .models import Art, ArtContributor, Member, Event


class MemberAdmin(admin.ModelAdmin):
    pass


class EventAdmin(admin.ModelAdmin):
    list_display = ("name", "date", "location", "publicationDate")


admin.site.register(Member, MemberAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Art)
admin.site.register(ArtContributor)
