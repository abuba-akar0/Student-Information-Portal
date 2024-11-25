import requests
from django.core.management.base import BaseCommand
from universities.models import University

class Command(BaseCommand):
    help = 'Fetch and store university details for Pakistan from Hipolabs'

    def handle(self, *args, **kwargs):
        url = "http://universities.hipolabs.com/search"
        querystring = {"country": "Pakistan"}  # Fetch universities in Pakistan

        try:
            response = requests.get(url, params=querystring)
            response.raise_for_status()  # Will raise an exception for HTTP errors (e.g., 404, 500)

            universities = response.json()

            # Process and store universities in the database
            for uni in universities:
                University.objects.get_or_create(
                    name=uni.get('name', 'N/A'),
                    country=uni.get('country', 'Pakistan'),
                    website=uni.get('web_pages', [None])[0],
                    city=uni.get('city', ''),
                    state_province=uni.get('state_province', '')
                )

            self.stdout.write(self.style.SUCCESS('Successfully fetched and stored universities for Pakistan.'))

        except requests.exceptions.RequestException as e:
            self.stdout.write(self.style.ERROR(f'Failed to fetch university data: {e}'))
