from django.contrib import admin
from .models import Member, Game, Event, GameContributor, GameShowcase


class MemberAdmin(admin.ModelAdmin):
    pass


# Sample EventsAdmin Class made
class EventsAdmin(admin.ModelAdmin):
    pass


class GameContributorAdmin(admin.ModelAdmin):
    pass


class GameShowcaseAdmin(admin.ModelAdmin):
    pass


class GamesAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "completion", "active", "hostURL", "isItch", "itchEmbedID", "pathToThumbnail", "event")


admin.site.register(Member, MemberAdmin)
admin.site.register(Event, EventsAdmin)
admin.site.register(Game, GamesAdmin)
admin.site.register(GameContributor, GameContributorAdmin)
admin.site.register(GameShowcase, GameShowcaseAdmin)
