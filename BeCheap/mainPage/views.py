from django.shortcuts import get_object_or_404
from rest_framework import permissions, generics, viewsets
from rest_framework.authtoken.admin import User
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


from .mixins import SlugMixin, CreateFavorite
from .models import Items, Categories
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ItemsSerializer, CategorySerializer









class GetItemsView(SlugMixin, viewsets.ModelViewSet):
    queryset = Items.objects.all()
    serializer_class = ItemsSerializer
    @action(methods=['get'], detail=False)
    def category(self, request):
        query = Categories.objects.all()
        # serializer = ItemsSerializer(queryset, many=True)
        return Response({"categories": [i.category_name for i in query]})
    # @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated,])
    # def AddToFavorite(self, request, slug):
    #     instance = self.get_object()
    #     Favorite.objects.get_or_create


class GetListByCategory(viewsets.ViewSet):
    def list(self, request, slug):
        queryset = Categories.objects.get(slug=slug).categories.all()
        serializer = ItemsSerializer(queryset, many=True)
        return Response(serializer.data)


class AddToFavorite(CreateFavorite, APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
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