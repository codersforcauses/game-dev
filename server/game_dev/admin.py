from django.contrib import admin
from .models import Member, Game, Event, GameContributor, GameShowcase, Committee, Jam


class MemberAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "active", "profile_picture", "about", "pronouns")
    search_fields = ["name", "about"]


# Sample EventsAdmin Class made
class EventAdmin(admin.ModelAdmin):
    list_display = ("name", "date", "location", "publicationDate")


class GameContributorAdmin(admin.ModelAdmin):
    raw_id_fields = ["game", "member"]


class GameShowcaseAdmin(admin.ModelAdmin):
    raw_id_fields = ["game"]


class GamesAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description", "completion", "active", "hostURL", "itchEmbedID", "thumbnail", "event")
    search_fields = ["name", "description"]


class CommitteeAdmin(admin.ModelAdmin):
    raw_id_fields = ["id"]


class JamAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ["name"]


admin.site.register(Member, MemberAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Game, GamesAdmin)
admin.site.register(GameContributor, GameContributorAdmin)
admin.site.register(GameShowcase, GameShowcaseAdmin)
admin.site.register(Committee, CommitteeAdmin)
admin.site.register(Jam, JamAdmin)
