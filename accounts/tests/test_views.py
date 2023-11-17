from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from django.contrib.auth.models import User
import json
from ..helpers.account_helper import AccountHelper
from ..helpers.type_helper import TypeHelper

# NOTE: Test command: python manage.py test accounts.tests.test_views
# NOTE: To run all test modules: python manage.py run_accounts_tests


class AccountViewTest(APITestCase):
    databases = "__all__"
    fixtures = [
        "accounts/tests/fixtures/types.json",
        "accounts/tests/fixtures/accounts.json"
    ]

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword"
        )
        refresh = RefreshToken.for_user(self.user)
        access_token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

    # ----------------------------------------------------------------------------

    def test_add_account(self):
        url = reverse("accounts:add_account")
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
        self.assertEqual(
            response.data["message"],
            "Added Account"
        )
        self.assertEqual(
            response.data["account"]["email"],
            "test-auto@gmail.com"
        )
        self.assertEqual(
            response.data["account"]["username"],
            "test-auto"
        )
        self.assertEqual(
            response.data["account"]["password"],
            "test-password"
        )
        self.assertEqual(
            response.data["account"]["company"],
            "auto-test"
        )
        self.assertEqual(
            response.data["account"]["website"],
            "https://www.example.com"
        )
        self.assertEqual(
            response.data["account"]["description"],
            "automated test"
        )
        self.assertEqual(
            response.data["account"]["type"],
            1
        )

    def test_add_account_with_invalid_type(self):
        url = reverse("accounts:add_account")
        data = {
            "email": "test-auto@gmail.com",
            "username": "test-auto",
            "password": "test-password",
            "company": "auto-test",
            "website": "https://www.example.com",
            "description": "automated test",
            "type": -1
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["error"],
            "{'type': [ErrorDetail(string='Invalid pk \"-1\" - "
            "object does not exist.', code='does_not_exist')]}"
        )

    # ----------------------------------------------------------------------------

    def test_update_account(self):
        url = reverse(
            "accounts:update_account",
            kwargs={"id": 1}
        )

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
        self.assertEqual(
            response.data["message"],
            "Updated Account"
        )
        self.assertEqual(
            response.data["account"]["email"],
            "test-auto-updated@gmail.com"
        )
        self.assertEqual(
            response.data["account"]["username"],
            "test-auto-updated"
        )
        self.assertEqual(
            response.data["account"]["password"],
            "test-password-updated"
        )
        self.assertEqual(
            response.data["account"]["company"],
            "auto-test-updated"
        )
        self.assertEqual(
            response.data["account"]["website"],
            "https://www.example-updated.com"
        )
        self.assertEqual(
            response.data["account"]["description"],
            "automated test updated"
        )

    def test_update_account_with_invalid_type(self):
        url = reverse(
            "accounts:update_account",
            kwargs={"id": 1}
        )

        data = {
            "email": "test-auto-updated@gmail.com",
            "username": "test-auto-updated",
            "password": "test-password-updated",
            "company": "auto-test-updated",
            "website": "https://www.example-updated.com",
            "description": "automated test updated",
            "type": -1
        }

        response = self.client.patch(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["error"],
            "{'type': [ErrorDetail(string='Invalid pk \"-1\" - "
            "object does not exist.', code='does_not_exist')]}"
        )

    # ----------------------------------------------------------------------------

    def test_delete_account(self):
        account_id = 1
        url = reverse(
            "accounts:delete_account",
            kwargs={"id": account_id}
        )

        account = AccountHelper.get_account_instance_by_id(account_id)
        expected_msg = "Deleted Account: " + str(account.email)

        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["message"],
            expected_msg
        )

    def test_delete_account_with_invalid_id(self):
        url = reverse(
            "accounts:delete_account",
            kwargs={"id": 999999}
        )

        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(
            response.data["error"],
            "No Account matches the given query."
        )

    # ----------------------------------------------------------------------------

    def test_list_accounts(self):
        url = reverse("accounts:list_accounts")

        response = self.client.get(url)
        actual_response = json.loads(response.content)

        with open(
            "accounts/tests/test_data/list_accounts_output.json",
            "r"
        ) as expected_response_file:
            expected_response = json.load(expected_response_file)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(actual_response, expected_response)

    # ----------------------------------------------------------------------------

    def test_list_accounts_by_email(self):
        url = reverse(
            "accounts:list_accounts_by_email",
            kwargs={"email": "testt@gmail.com"}
        )

        response = self.client.get(url)
        actual_response = json.loads(response.content)

        with open(
            "accounts/tests/test_data/list_accounts_by_email_output.json",
            "r"
        ) as expected_response_file:
            expected_response = json.load(expected_response_file)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(actual_response, expected_response)

    # ----------------------------------------------------------------------------

    def test_add_type(self):
        url = reverse("accounts:add_type")
        data = {
            "name": "test"
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["message"], "Added Type")
        self.assertEqual(response.data["type"]["name"], "test")

    # ----------------------------------------------------------------------------

    def test_update_type(self):
        url = reverse(
            "accounts:update_type",
            kwargs={"id": 1}
        )
        data = {
            "name": "test-updated"
        }

        response = self.client.patch(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Updated Type")
        self.assertEqual(response.data["type"]["name"], "test-updated")

    # ----------------------------------------------------------------------------

    def test_delete_type(self):
        type_id = 1
        url = reverse(
            "accounts:delete_type",
            kwargs={"id": type_id}
        )

        type_inst = TypeHelper.get_type_instance_by_id(type_id)
        expected_msg = "Deleted Type: " + str(type_inst.name)

        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], expected_msg)

    # ----------------------------------------------------------------------------

    def test_list_types(self):
        url = reverse("accounts:list_types")

        response = self.client.get(url)
        actual_response = json.loads(response.content)

        with open(
            "accounts/tests/test_data/list_types_output.json",
            "r"
        ) as expected_response_file:
            expected_response = json.load(expected_response_file)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(actual_response, expected_response)

    # ----------------------------------------------------------------------------
