from django.contrib import admin
from .models import Member, Game, Event, GameContributor, GameShowcase, Committee, SocialMedia


class SocialMediaInline(admin.TabularInline):
    model = SocialMedia
    extra = 1

# from issue-8-merge-40 temp need changes
from .models import Art, ArtContributor, ArtShowcase


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
    list_display = ("id", "name", "description", "completion", "active", "hostURL", "itchEmbedID", "thumbnail", "event")
    search_fields = ["name", "description"]


class CommitteeAdmin(admin.ModelAdmin):
    raw_id_fields = ["id"]


# from issue-8-merge-40 temp need changes
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
admin.site.register(Committee, CommitteeAdmin)

# from issue-8-merge-40 temp need changes
admin.site.register(Art, ArtAdmin)
# admin.site.register(ArtContributor)
admin.site.register(ArtShowcase)
