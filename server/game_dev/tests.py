from django.test import TestCase
from .models import Member


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
