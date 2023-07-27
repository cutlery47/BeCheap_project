from django.shortcuts import get_object_or_404
from rest_framework import generics

from mainPage.serializer import ItemsSerializer
from mainPage.models import Categories, Items
from rest_framework.views import APIView
from rest_framework.response import Response


class MixinForSlugCategory():
    lookup_field = 'item_category'
    lookup_url_kwarg = 'slug_category'


class GetItemsByCategory(MixinForSlugCategory, generics.ListAPIView):
    queryset = Items.objects.all()
    serializer_class = ItemsSerializer
