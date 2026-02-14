from django.db import models


class Member(models.Model):
    name = models.CharField(max_length=200)
    active = models.BooleanField(default=True)
    profile_picture = models.ImageField(upload_to="profiles/", null=True, blank=True)
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


# GameContributor table: links Game, Member, and role (composite PK)
class GameContributor(models.Model):
    game = models.ForeignKey('Game', on_delete=models.CASCADE, related_name='game_contributors')
    member = models.ForeignKey('Member', on_delete=models.CASCADE, related_name='member_games')
    role = models.CharField(max_length=100)

    class Meta:
        unique_together = (('game', 'member'),)

    def __str__(self):
        return f"{self.member.name} ({self.role}) for {self.game.name}"


class Game(models.Model):
    # Enum choices
    class CompletionStatus(models.IntegerChoices):
        WIP = 1, "Work in Progress (Unplayable)"
        PLAYABLE_DEV = 2, "Playable - In Development"
        BETA = 3, "Beta - Stable but not Final"
        COMPLETED = 4, "Completed"

    name = models.CharField(max_length=200, null=False)
    description = models.TextField()
    completion = models.IntegerField(
        choices=CompletionStatus.choices,
        default=CompletionStatus.WIP,
        null=False,
    )
    active = models.BooleanField(default=True, null=False)
    hostURL = models.URLField(max_length=2083)
    itchEmbedID = models.PositiveIntegerField(
        default=None,
        null=True,
        blank=True,
        help_text="If game is stored on itch.io, please enter the itchEmbedID, i.e., 1000200"
    )

    thumbnail = models.ImageField(upload_to="games/", null=True)
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return str(self.name)


class GameShowcase(models.Model):
    game = models.OneToOneField('Game', on_delete=models.CASCADE, related_name='game_showcases')
    description = models.TextField()

    def __str__(self):
        return f"{self.game.name}"


class Committee(models.Model):
    id = models.OneToOneField(Member, on_delete=models.CASCADE, primary_key=True)
    roles = {
        "P": "President",
        "VP": "Vice-President",
        "SEC": "Secretary",
        "TRE": "Treasurer",
        "MARK": "Marketing",
        "EV": "Events OCM",
        "PRO": "Projects OCM",
        "FRE": "Fresher Rep"
    }
    role = models.CharField(max_length=9, choices=roles, default="FRE", unique=True)

    def get_member(self):
        return self.id

    def __str__(self):
        return self.id.name


# Copied from issue-8-merge-40 therefore is just sample to work with
class Art(models.Model):
    name = models.CharField(null=False, max_length=200)
    description = models.CharField(max_length=200,)

    # Talk to the artwork team to change their model to meet the follow, remove the null and blank
    source_game = models.ForeignKey('Game', on_delete=models.CASCADE, related_name='game_artwork', null=True, blank=True)
    media = models.ImageField(upload_to='art/', null=False)
    active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.name)


class ArtContributor(models.Model):
    art = models.ForeignKey('Art', on_delete=models.CASCADE, related_name='contributors')
    member = models.ForeignKey('Member', on_delete=models.CASCADE, related_name='art_contributions')
    role = models.CharField(max_length=100)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['art', 'member'], name='unique_art_member')
        ]
        verbose_name = 'Art Contributor'
        verbose_name_plural = 'Art Contributors'

    def __str__(self):
        return f"{self.member.name} - {self.art.name} ({self.role})"


class ArtShowcase(models.Model):
    description = models.CharField(max_length=200)
    art = models.ForeignKey(Art, on_delete=models.CASCADE, related_name='showcase')

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['art'],
                name='unique_artshowcase_per_art',
                violation_error_message='Each art piece can only have one showcase.')
        ]

    def __str__(self):
        return f"ArtShowcase[Art={str(self.art.name)}, Description={self.description}]"
