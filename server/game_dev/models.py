from django.db import models


class Member(models.Model):
    name = models.CharField(max_length=200)
    active = models.BooleanField(default=True)
    profile_picture = models.ImageField(upload_to="profiles/", null=True)
    about = models.CharField(max_length=256, blank=True)
    pronouns = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return str(self.name)

      
class Event(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateTimeField()
    description = models.CharField(max_length=256, blank=True)
    publicationDate = models.DateField()
    cover_image = models.ImageField(upload_to="events/", null=True)
    location = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class Games(models.Model):

    # Enum choices
    class CompletionStatus(models.IntegerChoices):
        WIP = 1, "Work in Progress (Unplayable)"
        PLAYABLE_DEV = 2, "Playable - In Development"
        BETA = 3, "Beta - Stable but not Final"
        COMPLETED = 4, "Completed"

    name = models.CharField(max_length=200, null=False)
    description = models.CharField(max_length=4500)
    completion = models.IntegerField(
        choices=CompletionStatus.choices,
        default=CompletionStatus.WIP,
        null=False,
    )
    active = models.BooleanField(default=True, null=False)
    hostURL = models.CharField(
        max_length=2083,
        help_text="If game is stored on itch.io, please enter the 7 digit long game id as its hostURL, i.e., 1000200"
    )         # If isItch is true then input only the Game ID
    isItch = models.BooleanField(default=True, null=False)
    pathToThumbnail = models.ImageField(upload_to="games/", null=True)
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return str(self.name)
      

