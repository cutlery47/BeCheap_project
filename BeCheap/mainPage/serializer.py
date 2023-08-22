from rest_framework import serializers
from .models import Items, Categories


class ItemsSerializer(serializers.ModelSerializer):
    item_category = serializers.SlugRelatedField(slug_field='category_name', read_only=True)
    class Meta:
        model = Items
        fields = ['id',
                  'item_name',
                  'item_brand',
                  'item_category',
                  'item_cur_price',
                  'item_prev_price',
                  'item_link',
                  'item_date',
                  'item_image',
                  'slug']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = [
            'category_name',
            'slug'
        ]


# class CreateFavorite(serializers.ModelSerializer):
#     def create(self, validate_data):
#         favorite =