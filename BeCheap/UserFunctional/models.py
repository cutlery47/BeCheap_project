from django.contrib.auth.models import User
from django.db import models
from django.forms import forms
from mainPage.models import Categories, Items


# Create your models here.

class Profile(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,  related_name='user_telegram', null=False)
    telegram_user_id = models.IntegerField()
    is_telegram_subscriber = models.BooleanField(default=True)






