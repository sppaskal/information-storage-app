from ..models import Account


class AccountHelper:

    # Database methods

    @staticmethod
    def select_related_fields(queryset):
        return queryset.select_related('type')

    @staticmethod
    def get_all_accounts():
        return Account.objects.all()

    @staticmethod
    def get_account_instance_by_id(account_id):
        return Account.objects.get(id=account_id)

    @staticmethod
    def get_account_qs_by_id(account_id):
        return Account.objects.filter(id=account_id)

    @staticmethod
    def get_account_instance_by_email(email):
        return Account.objects.get(email=email)

    @staticmethod
    def get_account_qs_by_email(email):
        return Account.objects.filter(email=email)

    # In-memory data methods

    @staticmethod
    def filter_accounts_by_email(data, email):
        # Email is not guaranteed to be unique, so we return a list of matches.
        # This allows the caller to handle multiple accounts with the same email if needed.
        return [item for item in data if item.get("email") == email]

    @staticmethod
    def filter_accounts_by_id(data, id):
        # Account IDs are unique, so we return a single match (or None).
        # This avoids wrapping the result in a list and keeps the response format consistent.
        # We also cast the ID to int to ensure type-safe comparison with cached data.
        try:
            id = int(id)
        except (ValueError, TypeError):
            return None

        for item in data:
            if item.get("id") == id:
                return item
        return None
