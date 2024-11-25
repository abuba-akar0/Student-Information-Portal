from django.db import models


class Scholarship(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    website = models.URLField()
    # Removed deadline and country fields

    def __str__(self):
        return self.title
