from django.test import TestCase
from .models import Member, Event, Committee
import datetime
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone
from django.urls import reverse
from django.db.utils import IntegrityError


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
            coverImage=image_file,
            location="Ezone",
            workshopLink="https://example.com/workshop",
        )

    def test_publication_date_is_date(self):
        event = Event.objects.get(pk=self.event.pk)
        self.assertIsInstance(event.publicationDate, datetime.date)

    def test_publication_date_matches(self):
        event = Event.objects.get(pk=self.event.pk)
        self.assertEqual(event.publicationDate, self.pub_date)

    def test_cover_image_not_empty(self):
        self.assertIsNotNone(self.event.coverImage)

    def test_cover_image_is_saved_in_correct_folder(self):
        self.assertTrue(self.event.coverImage.name.startswith("events/"))

    def test_publication_date_not_empty(self):
        self.assertTrue(bool(self.event.publicationDate))

    def test_event_date_is_datetime(self):
        event = Event.objects.get(pk=self.event.pk)
        self.assertIsInstance(event.date, datetime.datetime)

    def test_event_datetime_matches(self):
        event = Event.objects.get(pk=self.event.pk)
        self.assertEqual(event.date, self.event_datetime)

    def test_workshop_link_matches(self):
        event = Event.objects.get(pk=self.event.pk)
        self.assertEqual(event.workshopLink, "https://example.com/workshop")


class CommitteeModelTest(TestCase):
    def setUp(self):
        self.member = Member.objects.create(
            name="Linus Torvalds",
            about="Linux creator",
            pronouns="He/Him"
        )
        try:
            Member.objects.get(name="Linus Torvalds")
        except Member.DoesNotExist:
            self.fail("Member was not properly created before testing Committee model; check Member model")
        self.committee = Committee.objects.create(id=self.member, role="P")

    def test_committee_creation(self):
        try:
            Committee.objects.get(id=self.member)
        except Member.DoesNotExist:
            self.fail("Committee Member was not properly created")

    def test_role_is_unique(self):
        Member.objects.create(
            name="Jane Doe",
            about="Placeholder",
            pronouns="She/Her"
        )
        try:
            Committee.objects.create(id=Member.objects.get(name="Jane Doe"), role="P")
            self.fail("Committee Member with a duplicate role was created")
        except IntegrityError:
            return True

    def test_cascade_from_committee(self):
        self.committee.delete()
        try:
            Member.objects.get(name=self.member.name)
        except Member.DoesNotExist:
            self.fail("Deleting Committee object deleted it's corresponding Member object (undesired behaviour)")

    def test_cascade_from_member(self):
        tempRole = Committee.objects.get(id=self.member).role
        self.member.delete()
        try:
            Committee.objects.get(role=tempRole)
            self.fail("Deleting Member Object did not delete a possible corresponding Committee object (undesired behaviour)")
        except Committee.DoesNotExist:
            return True


class EventListAPITest(TestCase):
    def setUp(self):
        self.url = reverse("events-list")

        now = timezone.now()

        self.past_old = Event.objects.create(
            name="Past Old Event",
            date=now - datetime.timedelta(days=30),
            description="past old",
            publicationDate=now.date(),
            location="Perth",
        )
        self.past_new = Event.objects.create(
            name="Old Event2",
            date=now - datetime.timedelta(days=1),
            description="past new",
            publicationDate=now.date(),
            location="Perth",
        )
        self.up_soon = Event.objects.create(
            name="Upcoming Soon",
            date=now + datetime.timedelta(days=1),
            description="up soon 1 day",
            publicationDate=now.date(),
            location="Perth",
        )
        self.up_later = Event.objects.create(
            name="Upcoming Later",
            date=now + datetime.timedelta(days=30),
            description="up later",
            publicationDate=now.date(),
            location="Perth",
        )

    def _ids(self, resp_json):
        return [item["id"] for item in resp_json["results"]]

    def test_past(self):
        res = self.client.get(self.url, {"type": "past"})
        self.assertEqual(res.status_code, 200)

        body = res.json()
        self.assertIn("results", body)
        self.assertIn("count", body)

        ids = self._ids(body)
        self.assertEqual(ids, [self.past_new.id, self.past_old.id])

    def test_upcoming(self):
        res = self.client.get(self.url, {"type": "upcoming"})
        self.assertEqual(res.status_code, 200)

        body = res.json()
        self.assertIn("results", body)
        self.assertIn("count", body)

        ids = self._ids(body)
        self.assertEqual(ids, [self.up_soon.id, self.up_later.id])

    def test_default_is_upcoming(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, 200)

        body = res.json()
        ids = self._ids(body)
        self.assertEqual(ids, [self.up_soon.id, self.up_later.id])

    def test_invalid_type(self):
        res = self.client.get(self.url, {"type": "invalid"})
        self.assertEqual(res.status_code, 400)
