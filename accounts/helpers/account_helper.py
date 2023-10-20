from ..models import Account


class AccountHelper:

    @staticmethod
    def get_account_instance_by_id(account_id):
        return Account.objects.get(id=account_id)

    @staticmethod
    def get_account_qs_by_id(account_id):
        return Account.objects.filter(id=account_id)
