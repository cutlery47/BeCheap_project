from django.db import models
from django.forms import forms

from mainPage.models import Categories, Items


# Create your models here.

class User_Huly(models.Model):
    user_name = models.CharField(max_length=50, unique=True)
    user_email = models.EmailField(max_length=254)
    user_passwors = models.CharField()


class Favorite(models.Model):
    user = models.ForeignKey(User_Huly, on_delete=models.CASCADE, related_name='user')
    item = models.ForeignKey(Items, on_delete=models.CASCADE, related_name='item')


