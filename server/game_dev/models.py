from django.db import models
from requests import get
from django.core.files.base import ContentFile


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
    jamID = models.PositiveBigIntegerField(unique=True, blank=True, null=True, help_text="See documentation on how to find")
    games = models.JSONField(default=list, blank=True, help_text="Only filled if event is a Game Jam")

    def __str__(self):
        return self.name

    def save(self, force_insert=False, force_update=False):
        def jamFail():
            self.jamID = None
            self.games = []

        if self.jamID is not None:
            try:
                r = get(f"https://itch.io/jam/{self.jamID}/results.json")
            except Exception as e:
                print(e)
                jamFail()
                return super().save(force_insert, force_update)
            try:
                results = r.json()["results"]
            except KeyError:
                print("Error: No results for this Jam ID could be found")
                jamFail()
                return super().save(force_insert, force_update)
            if len(results) == 0:
                print("Error: No results for this Jam ID could be found")
                jamFail()
                return super().save(force_insert, force_update)
            games = []
            for i in results:
                try:
                    cur = Game.objects.get(hostURL=i["url"], name=i["title"])
                    games.append(cur.pk)
                except Game.DoesNotExist:
                    Game.objects.create(name=i["title"], completion=4, hostURL=i["url"], thumbnail="", event=self)

                    imageURL = i["cover_url"]
                    try:
                        # Uploads each image to the backend from their url
                        image = get(imageURL)
                        imageName = imageURL.split("/")[-1]
                        imageContent = ContentFile(image.content)
                        Game.objects.get(name=i["title"], hostURL=i["url"]).thumbnail.save(imageName, imageContent, save=True)
                    except Exception as e:
                        print(f"Error: {e}, most likely an invalid url for a game's cover image")

                    games.append(Game.objects.get(name=i["title"], hostURL=i["url"]).pk)
                    contributors = i["contributors"]
                    for x in contributors:
                        try:
                            socialMedia = SocialMedia.objects.get(socialMediaUserName=x["name"])
                            GameContributor.objects.create(game=Game.objects.get(name=i["title"], hostURL=i["url"]),
                                                            member=socialMedia.member, role="Please add role manually")
                        except Exception as e:
                            print(e)
                            continue
                        

            self.games = games
        else:
            self.games = []
        return super().save(force_insert, force_update)


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

    itchGameEmbedID = models.PositiveBigIntegerField(
        default=None,
        null=True,
        blank=True,
        help_text="If a game has a web demo stored on itch.io, please enter the embed ID"
    )

    itchGameWidth = models.PositiveBigIntegerField(
        default=0
    )
    itchGameHeight = models.PositiveBigIntegerField(
        default=0
    )

    def __str__(self):
        return str(self.name)


class GameShowcase(models.Model):
    game = models.OneToOneField('Game', on_delete=models.CASCADE, related_name='game_showcases')
    description = models.TextField()

    def __str__(self):
        return f"{self.game.name}"


class SocialMedia(models.Model):
    link = models.URLField(max_length=2083)
    member = models.ForeignKey('Member', on_delete=models.CASCADE, related_name='social_media_links')
    socialMediaUserName = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.socialMediaUserName} link for {self.member.name}"


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
