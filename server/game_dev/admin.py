from django.contrib import admin
from .models import Member, Art, ArtContributor


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'active', 'pronouns']
    list_filter = ['active']
    search_fields = ['name']


@admin.register(Art)
class ArtAdmin(admin.ModelAdmin):
    list_display = ['name', 'active']
    list_filter = ['active']
    search_fields = ['name']


@admin.register(ArtContributor)
class ArtContributorAdmin(admin.ModelAdmin):
    list_display = ['art', 'member', 'role']
    list_filter = ['role']
    search_fields = ['member__name', 'art__name']
    autocomplete_fields = ['art', 'member']