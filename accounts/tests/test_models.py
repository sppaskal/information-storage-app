from django.test import TestCase
from ..helpers.type_helper import TypeHelper
from ..models import (
    Account,
    Type,
)
from django.contrib.auth.models import User

# NOTE: Test command: python manage.py test accounts.tests.test_models
# NOTE: To run all test modules: python manage.py run_accounts_tests

class ModelTests(TestCase):
    databases = "__all__"
    fixtures = [
        "accounts/tests/fixtures/types.json",
    ]

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword"
        )

    # ----------------------------------------------------------------------------

    def test_account_creation(self):
        type_inst = TypeHelper.get_type_instance_by_id(
            type_id=1
        )

        instance = Account.objects.create(
            user_id=10,
            email='test@test.com',
            username='testuser',
            password='testpassword',
            company='testcompany',
            website='www.test.com',
            description='test description',
            type=type_inst
        )

        saved_instance = Account.objects.get(pk=instance.pk)

        self.assertEqual(saved_instance.email, 'test@test.com')
        self.assertEqual(saved_instance.username, 'testuser')
        self.assertEqual(saved_instance.password, 'testpassword')
        self.assertEqual(saved_instance.company, 'testcompany')
        self.assertEqual(saved_instance.website, 'www.test.com')
        self.assertEqual(saved_instance.description, 'test description')
        self.assertEqual(saved_instance.type, type_inst)
        self.assertEqual(saved_instance.user_id, 10)

    # ----------------------------------------------------------------------------

    def test_type_creation(self):
        instance = Type.objects.create(
            name='test'
        )

        saved_instance = Type.objects.get(pk=instance.pk)

        self.assertEqual(saved_instance.name, 'test')

    # ----------------------------------------------------------------------------