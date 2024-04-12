from rest_framework.test import APITestCase
from rest_framework import status
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from django.contrib.auth.models import User
# import json

# NOTE: Test command: python manage.py test authentication.tests.test_views
# NOTE: To run all test modules: python manage.py run_authentication_tests


class ViewTests(APITestCase):
    databases = "__all__"
    username = "testuser"
    password = "testpassword"
    fixtures = [
        "authentication/tests/fixtures/users.json",
        "authentication/tests/fixtures/access_codes.json"
    ]

    def setUp(self):
        self.user = User.objects.get(username=self.username)
        refresh = RefreshToken.for_user(self.user)
        access_token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

    # ----------------------------------------------------------------------------

    def test_valid_login_initial(self):
        url = reverse("authentication:login-initial")
        data = {
             "username": self.username,
             "password": self.password
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        if settings.DEMO_MODE:
            self.assertIn('access_token', response.data)
            self.assertNotEqual(response.data['access_token'], '')
            self.assertIn('refresh_token', response.data)
            self.assertNotEqual(response.data['refresh_token'], '')

    def test_invalid_login_initial(self):
        url = reverse("authentication:login-initial")
        data = {
             "username": "wrongusername",
             "password": "wrongpassword"
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # ----------------------------------------------------------------------------

    def test_valid_login_final(self):
        url = reverse("authentication:login-final")
        data = {
             "username": self.username,
             "password": self.password,
             "access_code": 12345,
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access_token', response.data)
        self.assertNotEqual(response.data['access_token'], '')
        self.assertIn('refresh_token', response.data)
        self.assertNotEqual(response.data['refresh_token'], '')

    def test_invalid_login_final(self):
        url = reverse("authentication:login-final")
        data = {
             "username": self.username,
             "password": self.password,
             "access_code": 00000,
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # ----------------------------------------------------------------------------

    def test_create_valid_user(self):
        url = reverse("authentication:create_user")
        username = "testuser2"
        email = "test2@test.com"
        password = self.password
        data = {
             "username": username,
             "email": email,
             "password": password,
        }

        response = self.client.post(url, data, format='json')
        test_user = User.objects.get(username=username)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(test_user.username, username)
        self.assertEqual(test_user.email, email)
        self.assertTrue(test_user.check_password(password))

    def test_create_invalid_username_user(self):
        url = reverse("authentication:create_user")
        username = "testuser"
        email = "test2@test.com"
        password = self.password
        data = {
             "username": username,
             "email": email,
             "password": password,
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            "A user with that username already exists.",
            response.data["username"][0])

    def test_create_invalid_email_user(self):
        url = reverse("authentication:create_user")
        username = "testuser2"
        email = "test@test.com"
        password = self.password
        data = {
             "username": username,
             "email": email,
             "password": password,
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            "A user with that email already exists.",
            response.data["non_field_errors"][0])

    # ----------------------------------------------------------------------------

    def test_valid_update_user(self):
        url = reverse("authentication:update_user")
        username = "testuser2"
        email = "test2@test.com"
        password = "newpassword"
        data = {
             "username": username,
             "email": email,
             "password": password,
        }

        response = self.client.put(url, data, format='json')
        test_user = User.objects.get(pk=1)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(test_user.username, username)
        self.assertEqual(test_user.email, email)
        self.assertTrue(test_user.check_password(password))

    def test_duplicate_username_update(self):
        url = reverse("authentication:update_user")
        username = "testuser3"
        email = "test2@test.com"
        password = "newpassword"
        data = {
             "username": username,
             "email": email,
             "password": password,
        }

        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
                    "A user with that username already exists.",
                    response.data["username"][0])

    def test_duplicate_email_update(self):
        url = reverse("authentication:update_user")
        username = "testuser2"
        email = "test3@test.com"
        password = "newpassword"
        data = {
             "username": username,
             "email": email,
             "password": password,
        }

        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
                    "A user with that email already exists.",
                    response.data["non_field_errors"][0])

    def test_invalid_email_update(self):
        url = reverse("authentication:update_user")
        username = "testuser2"
        email = "123"
        password = "newpassword"
        data = {
             "username": username,
             "email": email,
             "password": password,
        }

        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
                    "Enter a valid email address.",
                    response.data["email"][0])
