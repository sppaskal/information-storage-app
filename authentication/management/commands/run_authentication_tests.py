from django.core.management.base import BaseCommand
from django.core.management import call_command

# NOTE: To run all test modules: python manage.py run_authentication_tests


class Command(BaseCommand):
    help = 'Run all authentication test modules'

    def handle(self, *args, **options):
        call_command('test', 'authentication.tests', '--pattern=test_*.py')
