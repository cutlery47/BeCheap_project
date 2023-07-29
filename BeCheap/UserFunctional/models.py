from django.contrib.auth.models import User
from django.db import models
from django.forms import forms

from mainPage.models import Categories, Items


# Create your models here.



class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    item = models.ForeignKey(Items, on_delete=models.CASCADE, related_name='item')


