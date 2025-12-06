from django.test import TestCase
from .models import Event
import datetime
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone


class EventModelTest(TestCase):
    def setUp(self):
        image_file = SimpleUploadedFile(
            "test_event.jpg",
            b"dummy image data",
            content_type="image/jpeg",
        )
        naive_dt = datetime.datetime(2025, 12, 25, 15, 30)
        self.event_datetime = timezone.make_aware(
            naive_dt,
            timezone.get_default_timezone(),
        )

        self.pub_date = datetime.date(2025, 11, 29)
        self.event = Event.objects.create(
            name="Super Fun Event",
            date=self.event_datetime,
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

    def test_event_date_is_datetime(self):
        event = Event.objects.get(pk=self.event.pk)
        self.assertIsInstance(event.date, datetime.datetime)

    def test_event_datetime_matches(self):
        event = Event.objects.get(pk=self.event.pk)
        self.assertEqual(event.date, self.event_datetime)
