# scholarships/management/commands/fetch_scholarships.py
from django.core.management.base import BaseCommand
import json
from scholarships.models import Scholarship


class Command(BaseCommand):
    help = 'Load scholarship data into the database'

    def handle(self, *args, **options):
        with open('scholarships/scholarships.json') as f:
            scholarships = json.load(f)
            for scholarship in scholarships:
                Scholarship.objects.create(
                    title=scholarship['title'],
                    description=scholarship['description'],
                    website=scholarship['website']
                )
        self.stdout.write(self.style.SUCCESS('Successfully loaded scholarship data.'))