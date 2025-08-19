from django.contrib.auth.models import User


class UserHelper():

    @staticmethod
    def create_user(user_data):
        User.objects.create_user(
            username=user_data['username'],
            email=user_data['email'],
            password=user_data['password']
        )
