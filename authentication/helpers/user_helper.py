from django.contrib.auth.models import User


class UserHelper():

    @staticmethod
    def create_user(user_data):
        User.objects.create_user(
            username=user_data['username'],
            email=user_data['email'],
            password=user_data['password']
        )

    @staticmethod
    def update_user(user_obj, update_data):
        '''
        Assumes update_data is a dictionary and updates
        the fields in the user_obj with matching fields
        from update_data.
        '''

        for key, value in update_data.items():
            # Check if the field exists in the User model
            if hasattr(user_obj, key):
                # Special handling for password field
                if key == 'password':
                    user_obj.set_password(value)
                else:
                    setattr(user_obj, key, value)

        return user_obj
