from django.db import models
from django.contrib.auth.models import User
from api.models import Student


class University(models.Model):
    name = models.CharField(max_length=128)
    location = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Program(models.Model):
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    description = models.TextField()

    def __str__(self):
        return f"{self.name} at {self.university.name}"


class Course(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()
    credits = models.IntegerField()

    def __str__(self):
        return self.name


class Grade(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    grade = models.CharField(max_length=2)

    def __str__(self):
        return f"{self.student.name} - {self.course.name} - {self.grade}"


class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.student.name} - {self.date} - {self.status}"
