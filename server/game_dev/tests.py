from django.test import TestCase
from .models import Member, Event
import datetime


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
        self.pub_date = datetime.date(2025, 11, 29)
        self.event = Event.objects.create(
            name="Super Fun Event",
            description="Yayayyayayay!",
            publicationDate=self.pub_date,
            location="Ezone",
        )

    def test_publication_date_is_date(self):
        event = Event.objects.get(pk=self.event.pk)
        self.assertIsInstance(event.publicationDate, datetime.date)

    def test_publication_date_matches(self):
        event = Event.objects.get(pk=self.event.pk)
        self.assertEqual(event.publicationDate, self.pub_date)

    def test_publication_date_not_empty(self):
        self.assertTrue(bool(self.event.publicationDate))