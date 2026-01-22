from django.contrib import admin
from .models import Member, Event, Committee


class MemberAdmin(admin.ModelAdmin):
    pass


class EventAdmin(admin.ModelAdmin):
    list_display = ("name", "date", "location", "publicationDate")


class CommitteeAdmin(admin.ModelAdmin):
    pass


admin.site.register(Member, MemberAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Committee, CommitteeAdmin)
