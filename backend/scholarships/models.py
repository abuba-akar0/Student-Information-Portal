from django.db import models

class Scholarship(models.Model):
    name = models.CharField(max_length=128)
    eligibility_criteria = models.TextField()
    deadline = models.DateField()
    description = models.TextField()

    def __str__(self):
        return self.name
