from django.test import TestCase
from .models import Member, Event
import datetime
from django.core.files.uploadedfile import SimpleUploadedFile


class MemberModelTest(TestCase):
    def setUp(self):
        self.member = Member.objects.create(
            name="Jane Doe",
            about="A placeholder who is kindly helping us with testing!",
            pronouns="She/Her"
        )

    def test_member_creation(self):
        try:
            Member.objects.get(name="Jane Doe")
        except Member.DoesNotExist:
            self.fail("Member was not properly created")

    def test_member_is_active(self):
        self.assertTrue(self.member.active)


class EventModelTest(TestCase):
    def setUp(self):
        image_file = SimpleUploadedFile(
            "test_event.jpg",
            b"dummy image data",
            content_type="image/jpeg",
        )
        self.pub_date = datetime.date(2025, 11, 29)
        self.event = Event.objects.create(
            name="Super Fun Event",
            description="Yayayyayayay!",
            publicationDate=self.pub_date,
            cover_image=image_file,
            location="Ezone",
        )

    def test_publication_date_is_date(self):
        event = Event.objects.get(pk=self.event.pk)
        self.assertIsInstance(event.publicationDate, datetime.date)

    def test_publication_date_matches(self):
        event = Event.objects.get(pk=self.event.pk)
        self.assertEqual(event.publicationDate, self.pub_date)

    def test_cover_image_not_empty(self):
        self.assertIsNotNone(self.event.cover_image)

    def test_cover_image_is_saved_in_correct_folder(self):
        self.assertTrue(self.event.cover_image.name.startswith("events/"))

    def test_publication_date_not_empty(self):
        self.assertTrue(bool(self.event.publicationDate))
