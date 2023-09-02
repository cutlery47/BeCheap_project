from django.conf import settings
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from .tasks import add_to_favorites_task
from rest_framework.views import APIView
from rest_framework.response import Response
from mainfunc.serializer import ItemsSerializer, CategorySerializer
from rest_framework import permissions, generics, viewsets, status
from rest_framework.authtoken.admin import User
from .services_userfunctional.generate_link import generate_link_with_start_parametre
from .services_userfunctional.create_token_func import create_token
from .models import Profile


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


class GetBotUrl(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        try:
            query = Profile.objects.get(user_id=request.user.id)
            return Response({'link': f'{settings.BOT_URL}'})
        except Profile.DoesNotExist:
            token = cache.get(request.user.id, )
            if token:
                bot_url = generate_link_with_start_parametre(settings.BOT_URL, token)
                return Response({'link': bot_url})
            else:
                token = create_token(settings.BOT_TOKEN_LENGTH)
                bot_url = generate_link_with_start_parametre(settings.BOT_URL, token)
                cache.set(request.user.id, token)
                cache.set(token, request.user.id)
                return Response({'link': bot_url})