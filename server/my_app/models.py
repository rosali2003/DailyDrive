from django.db import models

# Choices for time units
TIME_UNITS = [
    ('day', 'Day'),
    ('week', 'Week'),
    ('month', 'Month'),
    ('year', 'Year')
]

#Django has a built-in autoincrement unique id for each Model
class User(models.Model):
    email = models.CharField(max_length=200)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

class Goals(models.Model):
    title = models.TextField()
    completion_date = models.DateTimeField(null=True, blank=True) 


class Habits(models.Model):
    title = models.TextField()
    description = models.TextField()
    recurrence = models.CharField(max_length=50)
    frequency = models.PositiveIntegerField(default=1)  # How many times the habit is repeated in the interval
    interval = models.PositiveIntegerField(default=1)  # Interval between repetitions
    unit = models.CharField(max_length=10, choices=TIME_UNITS, default='day')  # Time unit for the interval
    
