from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response

from mainPage.models import Items, Categories
from mainPage.serializer import ItemsSerializer, CategorySerializer
from rest_framework import permissions, generics, viewsets, status
from rest_framework.authtoken.admin import User

from .mixins import CreateFavorite


class AddToFavorite(CreateFavorite, APIView):

    def post(self, request, item_id):
        query = self.add_to_favorites(request, Items, 'favorites', pk=item_id)
        if query:
            return Response({"message": "Добавлено в избранное"})
        return Response({"message": "Удалено из избранного"})


class AddToSubscription(CreateFavorite, APIView):
    def post(self, request, category_id):
        query = self.add_to_favorites(request, Categories, 'subscriptions', pk=category_id)
        if query:
            return Response({"message": "Добавлено в избранное"})
        return Response({"message": "Удалено из избранного"})


class GiveUserFavorites(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user_object = get_object_or_404(User, pk=request.user.id)
        serializer = ItemsSerializer(user_object.user.all(), many=True)
        return Response(serializer.data)


class GiveUserCategories(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user_object = get_object_or_404(User, pk=request.user.id)
        serializer = CategorySerializer(user_object.subscriptions_categories.all(), many=True)
        return Response(serializer.data)
