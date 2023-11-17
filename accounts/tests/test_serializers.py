from django.test import TestCase
from ..helpers.type_helper import TypeHelper
from ..models import (
    Account,
)

# NOTE: Test command: python manage.py test accounts.tests.test_serliazers


class YourModelTest(TestCase):
    databases = "__all__"
    fixtures = [
        "accounts/tests/fixtures/types.json",
    ]

    def setUp(self):
        pass

    def test_model_creation(self):

        type_inst = TypeHelper.get_type_instance_by_id(
            type_id=1
        )

        # Create an instance of Account model
        instance = Account.objects.create(
            email='test@test.com',
            username='testuser',
            password='testpassword',
            company='testcompany',
            website='www.test.com',
            description='test description',
            type=type_inst
        )

        # Query the database to retrieve the saved instance
        saved_instance = Account.objects.get(pk=instance.pk)

        self.assertEqual(saved_instance.email, 'test@test.com')
        self.assertEqual(saved_instance.username, 'testuser')
        self.assertEqual(saved_instance.password, 'testpassword')
        self.assertEqual(saved_instance.company, 'testcompany')
        self.assertEqual(saved_instance.website, 'www.test.com')
        self.assertEqual(saved_instance.description, 'test description')
        self.assertEqual(saved_instance.type, type_inst)
