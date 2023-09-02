from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.response import Response

from keepitcheap.mainfunc.models import Items
from keepitcheap.mainfunc.models import Favorite


class FavoritesSerializer(serializers.ModelSerializer):
    item = serializers.SlugRelatedField(slug_field='slug', queryset=Items.objects)
    user = serializers.SlugRelatedField(slug_field='username', queryset=User.objects)

    class Meta:
        model = Favorite
        fields = ["item", "user"]

    def create(self, validated_data):
        new_obj, created = Favorite.objects.get_or_create(
            item=validated_data.get("item"),
            user=validated_data.get("user")
        )
        if not created:
            new_obj.delete()
            return False
        else:
            return created
