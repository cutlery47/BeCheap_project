from django.conf import settings
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from .tasks import add_to_favorites_task
from rest_framework.views import APIView
from rest_framework.response import Response

from mainPage.models import Items, Categories
from mainPage.serializer import ItemsSerializer, CategorySerializer
from rest_framework import permissions, generics, viewsets, status
from rest_framework.authtoken.admin import User




class AddToFavorite(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, item_id):
        if cache.get(f'{request.user.id}_{settings.FAVORITES_CACHE_NAME}'):
            cache.delete(f'{request.user.id}_{settings.FAVORITES_CACHE_NAME}')
        response = add_to_favorites_task.delay(request.user.id, 'Items', 'favorites', pk=item_id)
        if response.get():
            return Response({"message": "Добавлено в избранное"})
        return Response({"message": "Удалено из избранного"})


class AddToSubscription(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, category_id):
        response = add_to_favorites_task.delay(request.user.id, 'Category', 'favorites', pk=category_id)
        if response.get():
            return Response({"message": "Добавлено в подписки"})
        return Response({"message": "Удалено из подписок"})


class GiveUserFavorites(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        favorites = cache.get(f'{request.user.id}_{settings.FAVORITES_CACHE_NAME}')
        if favorites:
            return Response(favorites)
        else:
            user_object = get_object_or_404(User, pk=request.user.id)
            serializer = ItemsSerializer(user_object.user.all().select_related('item_category').prefetch_related('favorites'), many=True)
            cache.set(f'{request.user.id}_{settings.FAVORITES_CACHE_NAME}', serializer.data, settings.CACHE_TTL)
        return Response(serializer.data)


class GiveUserCategories(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user_object = get_object_or_404(User, pk=request.user.id)
        serializer = CategorySerializer(user_object.subscriptions_categories.all(), many=True)
        return Response(serializer.data)
