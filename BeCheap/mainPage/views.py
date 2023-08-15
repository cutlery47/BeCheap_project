from django.conf import settings
from django.core.cache import cache
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.shortcuts import get_object_or_404
from django.views.decorators.cache import cache_page
from rest_framework import permissions, generics, viewsets
from rest_framework.authtoken.admin import User
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated

from .mixins import SlugMixin, PaginationClass
from .models import Items, Categories
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ItemsSerializer, CategorySerializer


# class GetItemsView(SlugMixin, viewsets.ModelViewSet):
#     queryset = Items.objects.all().select_related('item_category')
#     serializer_class = ItemsSerializer
#     @action(methods=['get'], detail=False)
#     def category(self, request):
#         query = Categories.objects.all()
#         # serializer = ItemsSerializer(queryset, many=True)
#         return Response({"categories": [i.category_name for i in query]})
#     # @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated,])
#     # def AddToFavorite(self, request, slug):
#     #     instance = self.get_object()
#     #     Favorite.objects.get_or_create


class GetItemsView(viewsets.ViewSet, PaginationClass):
    query = Items
    pagination_size = 10

    def get_items(self, request, page_number):
        if page_number < 0:
            raise ValidationError("page must be non negative number")
        page = self.get_page(page_number, ItemsSerializer, cache_name=settings.ITEMS_CACHE_NAME,
                             select_related='item_category', prefetch_related='favorites')
        if page:
            return Response(page)
        else:
            return Response({'{"message": "Морис я бильше не можу гоп гоп чи да гоп"}'})


class GetItem(viewsets.ViewSet):

    def get_one_item(self, request, slug):
        item = cache.get(slug)
        if item:
            print('кэшировано')
            return Response(item)
        else:
            item = Items.objects.get(slug=slug)
            serializer = ItemsSerializer(item)
            cache.set(slug, serializer.data, 60)
        return Response(serializer.data)


class GetListByCategory(viewsets.ViewSet):
    def list(self, request, slug):
        items_categories = cache.get(settings.CATEGORY_CACHE_NAME)
        if items_categories:
            cached_categories = items_categories
            return Response(cached_categories)
        else:
            queryset = Categories.objects.get(slug=slug).categories.all()
            serializer = ItemsSerializer(queryset, many=True)
            cache.set(settings.CATEGORY_CACHE_NAME, serializer.data, settings.CACHE_TTL)
            return Response(serializer.data)
