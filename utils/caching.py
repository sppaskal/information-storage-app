from django.conf import settings
from django.core.cache import cache


class Caching():

    @staticmethod
    def get_cache_value(key):
        # Dev mode
        if settings.DEV_CACHE:
            return cache.get(key)

        # Prod mode
        else:
            # Production logic
            return None

    @staticmethod
    def set_cache_value(key, value, timeout=3600):
        # Dev mode
        if settings.DEV_CACHE:
            cache.set(
                key,
                value,
                timeout
            )

            return True

        # Prod mode
        else:
            # Production logic
            return False

    @staticmethod
    def delete_cache_value(key):
        # Dev mode
        if settings.DEV_CACHE:
            cache.delete(key)
            return True

        # Prod mode
        else:
            # Production logic
            return False
