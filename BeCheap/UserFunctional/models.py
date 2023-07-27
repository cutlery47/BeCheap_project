from django.db import models
from django.forms import forms

from mainPage.models import Categories


# Create your models here.

class User(models.Model):
    user_name = models.CharField(max_length=50)
    user_email = models.EmailField(max_length=254)
    user_passwors = models.CharField()


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name='category')

    class Meta:
        unique_together = ('user', 'category')
