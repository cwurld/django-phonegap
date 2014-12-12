__author__ = 'Chuck Martin'

from django.db import models
from django.contrib.auth.models import User


QUALITY = (
    ('low', 'Low'),
    ('medium', 'Medium'),
    ('high', 'High')
)


class Message(models.Model):
    user = models.ForeignKey(User)
    message = models.TextField()
    priority = models.CharField(max_length=64, choices=QUALITY)
    received = models.DateTimeField(auto_now_add=True)
