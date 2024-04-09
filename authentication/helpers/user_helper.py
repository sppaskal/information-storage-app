class UserHelper():

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
