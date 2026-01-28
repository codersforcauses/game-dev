from django.contrib import admin
from .models import Member, Game, Event, GameContributor, GameShowcase


class MemberAdmin(admin.ModelAdmin):
    pass


# Sample EventsAdmin Class made
class EventAdmin(admin.ModelAdmin):
    list_display = ("name", "date", "location", "publicationDate")


class GameContributorAdmin(admin.ModelAdmin):
    pass


class GameShowcaseAdmin(admin.ModelAdmin):
    pass


class GamesAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description", "completion", "active", "hostURL", "itchEmbedID", "thumbnail", "event")


admin.site.register(Member, MemberAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Game, GamesAdmin)
admin.site.register(GameContributor, GameContributorAdmin)
admin.site.register(GameShowcase, GameShowcaseAdmin)
