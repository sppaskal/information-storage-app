from django.core.management.base import BaseCommand
from django.core.management import call_command


class Command(BaseCommand):
    help = 'Run all accounts test modules'

    def handle(self, *args, **options):
        call_command('test', 'accounts.tests', '--pattern=test_*.py')
