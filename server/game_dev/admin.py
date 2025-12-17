from django.contrib import admin
from .models import Member, Event


class MemberAdmin(admin.ModelAdmin):
    pass


class EventAdmin(admin.ModelAdmin):
    list_display = ("name", "date", "location", "publicationDate")


admin.site.register(Member, MemberAdmin)
admin.site.register(Event, EventAdmin)
