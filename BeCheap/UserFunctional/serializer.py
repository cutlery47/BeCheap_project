from rest_framework import serializers

from mainPage.models import Items
from .models import Favorite, User_Huly


class FavoritesSerializer(serializers.ModelSerializer):
    item = serializers.SlugRelatedField(slug_field='slug', queryset=Items.objects)
    user = serializers.SlugRelatedField(slug_field='user_name', queryset=User_Huly.objects)
    class Meta:
        model = Favorite
        fields = ["item", "user"]
    def create(self, validated_data):
        new_obj, created = Favorite.objects.get_or_create(**validated_data)
        if not created:
            new_obj.delete()
            print("Было")
            return False
        else:
            print("Добавлено")
            return created





