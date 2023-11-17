from ..models import AccessCode


class AccessCodeHelper():

    @staticmethod
    def get_access_code_instance_by_user_id(user_id):
        try:
            return AccessCode.objects.get(user=user_id)
        except AccessCode.DoesNotExist:
            return None
