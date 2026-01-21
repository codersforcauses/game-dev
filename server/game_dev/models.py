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
