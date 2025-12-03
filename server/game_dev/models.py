from django.db import models


class Member(models.Model):
    name = models.CharField(max_length=200)
    active = models.BooleanField(default=True)
    profile_picture = models.ImageField(upload_to="profiles/", null=True)
    about = models.CharField(max_length=256, blank=True)
    pronouns = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return str(self.name)


# Sample Events Class made
class Events(models.Model):
    name = models.CharField(max_length=200, null=False)
    description = models.CharField(max_length=4500)

    def __str__(self):
        return str(self.name)


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
    hostURL = models.CharField(max_length=2083)
    isItch = models.BooleanField(default=True, null=False)
    itchEmbeddedID = models.PositiveIntegerField()
    pathToMedia = models.CharField(max_length=2083)
    event = models.ForeignKey(Events, on_delete=models.CASCADE, null=False)
    # event reference uuid events.id model

    def __str__(self):
        return str(self.name)
