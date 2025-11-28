from django.db import models


class Member(models.Model):
    name = models.CharField(max_length=200)
    active = models.BooleanField(default=True)
    profile_picture = models.ImageField(upload_to="profiles/", null=True)
    about = models.CharField(max_length=256, blank=True)
    pronouns = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return str(self.name)


class Art(models.Model):
    name = models.CharField(null=False, max_length=200)
    description = models.CharField(max_length=200,)
    # source_game = models.ForeignKey(Games, on_delete=models.CASCADE, related_name='art_pieces') #Need implement Games model
    path_to_media = models.CharField(null=False, max_length=500)
    active = models.BooleanField(null=False)

    def __str__(self):
        return str(self.name)

class ArtContributor(models.Model):
    art = models.ForeignKey('Art', on_delete=models.CASCADE, related_name='contributors')
    member = models.ForeignKey('Member', on_delete=models.CASCADE, related_name='art_contributions')
    role = models.CharField(max_length=100)
    class Meta:
        unique_together = ('art', 'member')
        verbose_name = 'Art Contributor'
        verbose_name_plural = 'Art Contributors'
    
    def __str__(self):
        return f"{self.member.name} - {self.art.name} ({self.role})"
