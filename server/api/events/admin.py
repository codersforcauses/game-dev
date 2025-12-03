from django.contrib import admin  # noqa

# Register your models here.
from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "publicationDate", "location")
