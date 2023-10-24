from ..models import Account


class AccountHelper:

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
