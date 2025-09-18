from django.contrib.auth.models import User
from authentication.models import UserProfile


class UserHelper():

    @staticmethod
    def create_user(user_data):
        user = User.objects.create_user(
            username=user_data['username'],
            email=user_data['email'],
            password=user_data['password']
        )

        # Create the associated UserProfile
        mfa = user_data.get('mfa_enabled', False)
        UserProfile.objects.create(user=user, mfa_enabled=mfa)

        return user

    @staticmethod
    def is_mfa_enabled(user):
        try:
            return user.profile.mfa_enabled
        except UserProfile.DoesNotExist:
            return False  # Default to False if profile is missing