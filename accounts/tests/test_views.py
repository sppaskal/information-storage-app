from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.exceptions import ErrorDetail
from django.contrib.auth.models import User
from django.urls import reverse
from ..helpers.account_helper import AccountHelper


class AccountViewTest(APITestCase):
    databases = "__all__"
    fixtures = [
        "accounts/tests/fixtures/types_fixture.json",
        "accounts/tests/fixtures/accounts_fixture.json"
    ]

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        token, created = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        self.client.login(username='testuser', password='testpassword')

    # -------------------------------------------------------------------

    def test_add_account(self):
        url = reverse('accounts:add_account')
        data = {
            "email": "test-auto@gmail.com",
            "username": "test-auto",
            "password": "test-password",
            "company": "auto-test",
            "website": "https://www.example.com",
            "description": "automated test",
            "type": 1
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["message"], "Added Account")
        self.assertEqual(response.data["account"]["email"], "test-auto@gmail.com")
        self.assertEqual(response.data["account"]["username"], "test-auto")
        self.assertEqual(response.data["account"]["password"], "test-password")
        self.assertEqual(response.data["account"]["company"], "auto-test")
        self.assertEqual(response.data["account"]["website"], "https://www.example.com")
        self.assertEqual(response.data["account"]["description"], "automated test")
        self.assertEqual(response.data["account"]["type"], 1)

    def test_add_account_with_invalid_type(self):
        url = reverse('accounts:add_account')
        data = {
            "email": "test-auto@gmail.com",
            "username": "test-auto",
            "password": "test-password",
            "company": "auto-test",
            "website": "https://www.example.com",
            "description": "automated test",
            "type": -1
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["error"],
            "{'type': [ErrorDetail(string='Invalid pk \"-1\" - object does not exist.', "
            "code='does_not_exist')]}"
        )

    # -------------------------------------------------------------------

    def test_update_account(self):
        url = reverse('accounts:update_account', kwargs={'id': 1})
        data = {
            "email": "test-auto-updated@gmail.com",
            "username": "test-auto-updated",
            "password": "test-password-updated",
            "company": "auto-test-updated",
            "website": "https://www.example-updated.com",
            "description": "automated test updated",
            "type": 2
        }

        response = self.client.patch(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Updated Account")
        self.assertEqual(response.data["account"]["email"], "test-auto-updated@gmail.com")
        self.assertEqual(response.data["account"]["username"], "test-auto-updated")
        self.assertEqual(response.data["account"]["password"], "test-password-updated")
        self.assertEqual(response.data["account"]["company"], "auto-test-updated")
        self.assertEqual(response.data["account"]["website"], "https://www.example-updated.com")
        self.assertEqual(response.data["account"]["description"], "automated test updated")

    def test_update_account_with_invalid_type(self):
        url = reverse('accounts:update_account', kwargs={'id': 1})
        data = {
            "email": "test-auto-updated@gmail.com",
            "username": "test-auto-updated",
            "password": "test-password-updated",
            "company": "auto-test-updated",
            "website": "https://www.example-updated.com",
            "description": "automated test updated",
            "type": -1
        }

        response = self.client.patch(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["error"],
            "{'type': [ErrorDetail(string='Invalid pk \"-1\" - object does not exist.', "
            "code='does_not_exist')]}"
        )

    # -------------------------------------------------------------------
