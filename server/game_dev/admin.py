from django.contrib import admin
from .models import Art, ArtContributor, ArtShowcase, Member, Game, Event, GameContributor, GameShowcase


class MemberAdmin(admin.ModelAdmin):
    pass


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


admin.site.register(Member, MemberAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Game, GamesAdmin)
admin.site.register(GameContributor, GameContributorAdmin)
admin.site.register(GameShowcase, GameShowcaseAdmin)
admin.site.register(Art)
admin.site.register(ArtContributor)
admin.site.register(ArtShowcase)
