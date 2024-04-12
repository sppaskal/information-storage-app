from django.test import TestCase
from django.contrib.auth.models import User
from ..models import (
    AccessCode
)

# NOTE: Test command: python manage.py test authentication.tests.test_models
# NOTE: To run all test modules: python manage.py run_authentication_tests


class ModelTests(TestCase):
    databases = "__all__"
    fixtures = [
        "authentication/tests/fixtures/users.json",
    ]

    def setUp(self):
        pass

    # ----------------------------------------------------------------------------

    def test_access_code_creation(self):
        code = 12345
        used = 0
        user_id = 1
        user_instance = User.objects.get(id=user_id)

        instance = AccessCode.objects.create(
            code=code,
            used=used,
            user=user_instance
        )

        saved_instance = AccessCode.objects.get(pk=instance.pk)

        self.assertEqual(saved_instance.code, code)
        self.assertEqual(saved_instance.used, used)
        self.assertEqual(saved_instance.user, user_instance)
