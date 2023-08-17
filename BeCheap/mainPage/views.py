from django.shortcuts import get_object_or_404
from rest_framework import permissions, generics, viewsets
from rest_framework.authtoken.admin import User
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .mixins import SlugMixin, CreateFavorite
from .models import Items, Categories
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ItemsSerializer, CategorySerializer
from .mixins import Pagination_class
class GetItemsView(viewsets.ViewSet, Pagination_class):
    query = Items

    def get_items(self, request, page_number):
        page = self.get_page(page_number, ItemsSerializer)
        if page:
            return Response(page)
        else:
            return Response({'{"message": "Морис я бильше не можу гоп гоп чи да гоп"}'})

class GetItem(viewsets.ViewSet):
    def get_one_item(self, request, slug):
        item = Items.objects.get(slug=slug)
        serializer = ItemsSerializer(item)
        return Response(serializer.data)


class GetListByCategory(viewsets.ViewSet):
    def list(self, request, slug):
        queryset = Categories.objects.get(slug=slug).categories.all()
        serializer = ItemsSerializer(queryset, many=True)
        return Response(serializer.data)


class AddToFavorite(CreateFavorite, APIView):
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def post(self, request, item_id):
        query = self.add_to_favorites(request, Items, 'favorites', pk=item_id)
        if query:
            return Response({"message": "Добавлено в избранное"})
        return Response({"message": "Удалено из избранного"})

class AddToSubscription(CreateFavorite, APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def post(self, request, category_id):
        query = self.add_to_favorites(request, Categories, 'subscriptions', pk=category_id)
        if query:
            return Response({"message": "Добавлено в избранное"})
        return Response({"message": "Удалено из избранного"})

class GiveUserFavorites(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, user_name):
        user_object = get_object_or_404(User, username=user_name)
        serializer = ItemsSerializer(user_object.user.all(), many=True)
        return Response(serializer.data)

class GiveUserCategories(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, user_name):
        user_object = get_object_or_404(User, username=user_name)
        serializer = CategorySerializer(user_object.subscriptions_categories.all(), many=True)
        return Response(serializer.data)