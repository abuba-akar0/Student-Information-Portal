from django.contrib.auth.models import User
from django.core.validators import RegexValidator, MinLengthValidator, EmailValidator
from django.db import models


# Student model with user profile fields
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student_profile")
    name = models.CharField(max_length=128)
    date_of_birth = models.DateField()
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                 message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone = models.CharField(validators=[phone_regex], max_length=17, blank=True, null=True)
    email = models.EmailField(max_length=50, unique=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Students"
        indexes = [
            models.Index(fields=['email'], name='email_idx'),
            models.Index(fields=['date_created'], name='date_created_idx')
        ]

# Scholarship model with eligibility criteria and deadline details
class Scholarship(models.Model):
    name = models.CharField(max_length=128)
    eligibility_criteria = models.TextField()
    deadline = models.DateField()
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Scholarships"
        ordering = ['deadline']


# University model with related Scholarship option
class University(models.Model):
    name = models.CharField(max_length=128)
    location = models.CharField(max_length=128)
    courses_offered = models.TextField()
    scholarship_available = models.ForeignKey(Scholarship, on_delete=models.SET_NULL, null=True, blank=True,
                                              related_name="universities")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Universities"
        ordering = ['name']


# Course model related to University
class Course(models.Model):
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name="courses")
    course_name = models.CharField(max_length=128)
    course_code = models.CharField(max_length=10, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.course_name


# Notification model for user notifications
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.username}"


# Message model for user messaging
class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender.username} to {self.receiver.username}"


# Attachment model for message attachments
class Attachment(models.Model):
    message = models.ForeignKey(Message, related_name='attachments', on_delete=models.CASCADE)
    file_path = models.FileField(upload_to='attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attachment for message {self.message.id}"
