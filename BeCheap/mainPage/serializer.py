from rest_framework import serializers
from .models import Items

class ItemsSerializer(serializers.ModelSerializer):
    item_category = serializers.SlugRelatedField(slug_field='category_name', read_only=True)
    class Meta:
        model = Items
        fields = ['item_name',
                  'item_brand',
                  'item_category',
                  'item_cur_price',
                  'item_prev_price',
                  'item_link',
                  'item_date',
                  'item_image']