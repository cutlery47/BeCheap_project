from rest_framework import permissions, generics, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from UserFunctional.models import Favorite
from .mixins import SlugMixin
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
