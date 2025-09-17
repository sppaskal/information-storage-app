from django.conf import settings
from django.core.cache import cache


class Caching():

    @staticmethod
    def get_cache_value(key, user_id=None):
        # Dev mode
        if settings.DEV_CACHE:
            scoped_key = Caching._build_user_key(key, user_id)
            return cache.get(scoped_key)

        # Prod mode
        else:
            # Production logic
            return None

    @staticmethod
    def set_cache_value(key, value, timeout=3600, user_id=None):
        # Dev mode
        if settings.DEV_CACHE:
            scoped_key = Caching._build_user_key(key, user_id)
            cache.set(
                scoped_key,
                value,
                timeout
            )

            return True

        # Prod mode
        else:
            # Production logic
            return False

    @staticmethod
    def delete_cache_value(key, user_id=None):
        # Dev mode
        if settings.DEV_CACHE:
            scoped_key = Caching._build_user_key(key, user_id)
            cache.delete(scoped_key)
            return True

        # Prod mode
        else:
            # Production logic
            return False

    @staticmethod
    def _build_user_key(base_key, user_id):
        # Append user ID to cache key to isolate per-user data
        return f"{base_key}_user_{user_id}" if user_id is not None else base_key
