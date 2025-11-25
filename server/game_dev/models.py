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
    source_game = models.ForeignKey(Games, on_delete=models.CASCADE, related_name='art_pieces') #Need implement Games model
    path_to_media = models.CharField(null=False)
    active = models.BooleanField(null=False)

    def __str__(self):
        return str(self.name)
