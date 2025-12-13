from django.contrib import admin
from .models import Member, Art, ArtContributor


admin.site.register(Member)

admin.site.register(Art)

admin.site.register(ArtContributor)
