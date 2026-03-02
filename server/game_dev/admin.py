from django.contrib import admin
from .models import Art, ArtContributor, ArtShowcase, Member, Game, Event, GameContributor, GameShowcase, Committee, SocialMedia


class SocialMediaInline(admin.TabularInline):
    model = SocialMedia
    extra = 1


class MemberAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "active", "profile_picture", "about", "pronouns")
    search_fields = ["name", "about"]
    inlines = [SocialMediaInline]


# Sample EventsAdmin Class made
class EventAdmin(admin.ModelAdmin):
    list_display = ("name", "date", "location", "publicationDate")


class GameContributorAdmin(admin.ModelAdmin):
    raw_id_fields = ["game", "member"]


class GameShowcaseAdmin(admin.ModelAdmin):
    raw_id_fields = ["game"]


class GamesAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description", "completion", "active", "hostURL", "itchEmbedID", "itchGamePlayableID", "itchGameWidth",
                    "itchGameHeight", "thumbnail")
    search_fields = ["name", "description"]
    raw_id_fields = ["event"]


class CommitteeAdmin(admin.ModelAdmin):
    raw_id_fields = ["id"]


class ArtContributorInline(admin.TabularInline):
    model = ArtContributor
    extra = 1


class ArtAdmin(admin.ModelAdmin):
    inlines = [ArtContributorInline]


admin.site.register(Member, MemberAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Game, GamesAdmin)
admin.site.register(GameContributor, GameContributorAdmin)
admin.site.register(GameShowcase, GameShowcaseAdmin)
admin.site.register(Art, ArtAdmin)
admin.site.register(ArtShowcase)
admin.site.register(Committee, CommitteeAdmin)
