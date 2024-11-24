from django.db import models


# Career Counseling model, related to Student with additional fields for question and recommendation
class CareerQuestion(models.Model):
    question_text = models.CharField(max_length=255)
    choices = models.JSONField()  # Example: {"A": "Tech", "B": "Medicine", "C": "Arts"}

    def __str__(self):
        return self.question_text


class CareerRecommendation(models.Model):
    career_name = models.CharField(max_length=100)
    description = models.TextField()
    criteria = models.JSONField()  # Example: {"1": "A", "2": "B"}

    def __str__(self):
        return self.career_name


class UserResponse(models.Model):
    user_id = models.IntegerField()
    responses = models.JSONField()  # Example: {"1": "A", "2": "B"}

    def __str__(self):
        return f"User {self.user_id}'s responses"
