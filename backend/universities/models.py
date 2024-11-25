from django.db import models


class University(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    website = models.URLField(null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)  # Add this line
    state_province = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name
