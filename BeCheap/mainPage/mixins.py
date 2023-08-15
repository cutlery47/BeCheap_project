from django.core.cache import cache
from django.db.models import QuerySet
from django.db.models.fields.related_descriptors import ManyToManyDescriptor
from typing import Optional
from django.db.models.utils import AltersData
from rest_framework.authtoken.admin import User
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from mainPage.models import Items


class SlugMixin():
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'


# Класс для проверки и фильтрации

class FilterQueryForPagination():

    # Проверка на валидность страницы и ей возврат в случае существования
    def is_valid_page_query(self, page_query, serializer_class, **kwargs):
        if page_query:
            serialize = serializer_class(page_query, many=True)
            # если нужен кэш
            if kwargs['cache_key']:
                cache.set(kwargs['cache_key'], serialize.data)
            return serialize.data
        else:
            return None

    # Почти универсальный класс для вытаскивания из бд страниц
    def get_query(self, pagination_size, page_number, **kwargs):

        query_page = self.query.objects.all()[pagination_size * (page_number - 1):pagination_size * page_number]

        if kwargs['select_related'] and kwargs['prefetch_related']:
            return query_page.select_related(kwargs['select_related']).prefetch_related(kwargs['prefetch_related'])
        if kwargs['select_related']:
            return query_page.select_related(
                kwargs['select_related'])
        if kwargs['prefetch_related']:
            return query_page.select_related(
                kwargs['select_related'])
        else:
            return query_page


# Класс пагинации


class PaginationClass(FilterQueryForPagination):
    pagination_size = 10  # размер по объектов на одной странице умолчанию
    query = None  # выборка

    def get_page(self, page_number: int, serializer_class, **kwargs):

        if kwargs['cache_name']:  # если нужно кэшировать данные
            cache_name = kwargs['cache_name']
            cache_key = f'{page_number}_{cache_name}'
            page = cache.get(cache_key)
            if page:
                return page
            else:
                page_query = self.get_query(self.pagination_size, page_number, **kwargs)
                return self.is_valid_page_query(page_query, serializer_class, cache_key=cache_key)
        else:  # если данные не нужно кэшировать
            page_query = self.get_query(self.pagination_size, **kwargs)
            return self.is_valid_page_query(page_query, serializer_class)
