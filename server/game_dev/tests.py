from django.test import TestCase
from .models import Member, Event, Committee, Game, Art, ArtContributor, ArtShowcase
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


class ArtModelTest(TestCase):
    def setUp(self):
        # Create a game for source_game foreign key
        self.game = Game.objects.create(
            name="Test Game",
            description="A test game",
            completion=Game.CompletionStatus.WIP,
            hostURL="https://example.com",
        )

        # Create an art piece with media
        image_file = SimpleUploadedFile(
            "test_art.jpg",
            b"dummy art image data",
            content_type="image/jpeg",
        )
        self.art = Art.objects.create(
            name="Test Artwork",
            description="A beautiful test artwork",
            source_game=self.game,
            media=image_file,
        )

    def test_art_creation(self):
        try:
            Art.objects.get(name="Test Artwork")
        except Art.DoesNotExist:
            self.fail("Art was not properly created")

    def test_art_is_active_by_default(self):
        self.assertTrue(self.art.active)

    def test_media_is_saved_in_correct_folder(self):
        self.assertTrue(self.art.media.name.startswith("art/"))

    def test_media_field_not_empty(self):
        self.assertIsNotNone(self.art.media)

    def test_source_game_relationship(self):
        art = Art.objects.get(pk=self.art.pk)
        self.assertEqual(art.source_game, self.game)

    def test_cascade_from_game(self):
        # When game is deleted, art should remain (SET_NULL behavior would be ideal, but currently CASCADE)
        art_id = self.art.id
        self.game.delete()
        # Since source_game has CASCADE, the art should be deleted
        with self.assertRaises(Art.DoesNotExist):
            Art.objects.get(id=art_id)


class ArtContributorModelTest(TestCase):
    def setUp(self):
        # Create member
        self.member1 = Member.objects.create(
            name="John Artist",
            about="A talented artist",
            pronouns="He/Him"
        )
        self.member2 = Member.objects.create(
            name="Jane Designer",
            about="A creative designer",
            pronouns="She/Her"
        )

        # Create art
        image_file = SimpleUploadedFile(
            "test_art.jpg",
            b"dummy art image data",
            content_type="image/jpeg",
        )
        self.art = Art.objects.create(
            name="Collaborative Artwork",
            description="Art with multiple contributors",
            media=image_file,
        )

        # Create art contributor
        self.art_contributor = ArtContributor.objects.create(
            art=self.art,
            member=self.member1,
            role="Lead Artist"
        )

    def test_art_contributor_creation(self):
        try:
            ArtContributor.objects.get(art=self.art, member=self.member1)
        except ArtContributor.DoesNotExist:
            self.fail("ArtContributor was not properly created")

    def test_art_contributor_unique_constraint(self):
        # Try to create duplicate art-member pair
        with self.assertRaises(IntegrityError):
            ArtContributor.objects.create(
                art=self.art,
                member=self.member1,
                role="Another Role"
            )

    def test_multiple_contributors_for_same_art(self):
        # Should be able to add different members to same art
        ArtContributor.objects.create(
            art=self.art,
            member=self.member2,
            role="Character Designer"
        )
        contributors = ArtContributor.objects.filter(art=self.art)
        self.assertEqual(contributors.count(), 2)

    def test_cascade_from_art(self):
        # When art is deleted, art contributors should be deleted
        contributor_id = self.art_contributor.id
        self.art.delete()
        with self.assertRaises(ArtContributor.DoesNotExist):
            ArtContributor.objects.get(id=contributor_id)

    def test_cascade_from_member(self):
        # When member is deleted, art contributors should be deleted
        contributor_id = self.art_contributor.id
        self.member1.delete()
        with self.assertRaises(ArtContributor.DoesNotExist):
            ArtContributor.objects.get(id=contributor_id)

    def test_art_contributor_role(self):
        contributor = ArtContributor.objects.get(pk=self.art_contributor.pk)
        self.assertEqual(contributor.role, "Lead Artist")


class ArtShowcaseModelTest(TestCase):
    def setUp(self):
        # Create art pieces
        image_file1 = SimpleUploadedFile(
            "test_art1.jpg",
            b"dummy art image data",
            content_type="image/jpeg",
        )
        self.art1 = Art.objects.create(
            name="Showcased Artwork",
            description="This art is showcased",
            media=image_file1,
        )

        image_file2 = SimpleUploadedFile(
            "test_art2.jpg",
            b"dummy art image data 2",
            content_type="image/jpeg",
        )
        self.art2 = Art.objects.create(
            name="Another Artwork",
            description="This art is also showcased",
            media=image_file2,
        )

        # Create showcase
        self.showcase = ArtShowcase.objects.create(
            art=self.art1,
            description="Featured artwork of the month"
        )

    def test_art_showcase_creation(self):
        try:
            ArtShowcase.objects.get(art=self.art1)
        except ArtShowcase.DoesNotExist:
            self.fail("ArtShowcase was not properly created")

    def test_art_showcase_unique_constraint(self):
        # Try to create another showcase for the same art
        with self.assertRaises(IntegrityError):
            ArtShowcase.objects.create(
                art=self.art1,
                description="Another showcase for same art"
            )

    def test_multiple_showcases_for_different_arts(self):
        # Should be able to create showcases for different art pieces
        ArtShowcase.objects.create(
            art=self.art2,
            description="Another featured artwork"
        )
        showcases = ArtShowcase.objects.all()
        self.assertEqual(showcases.count(), 2)

    def test_cascade_from_art(self):
        # When art is deleted, its showcase should be deleted
        showcase_id = self.showcase.id
        self.art1.delete()
        with self.assertRaises(ArtShowcase.DoesNotExist):
            ArtShowcase.objects.get(id=showcase_id)

    def test_showcase_description(self):
        showcase = ArtShowcase.objects.get(pk=self.showcase.pk)
        self.assertEqual(showcase.description, "Featured artwork of the month")

    def test_art_showcase_relationship(self):
        showcase = ArtShowcase.objects.get(pk=self.showcase.pk)
        self.assertEqual(showcase.art, self.art1)
