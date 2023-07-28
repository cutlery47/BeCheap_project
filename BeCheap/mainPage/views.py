from rest_framework import permissions, generics, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from UserFunctional.models import Favorite
from .models import Items, Categories
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ItemsSerializer





class SlugMixin():
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'
class GetItemsView(SlugMixin, viewsets.ModelViewSet):
    queryset = Items.objects.all()
    serializer_class = ItemsSerializer
    # @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated,])
    # def AddToFavorite(self, request, slug):
    #     instance = self.get_object()
    #     Favorite.objects.get_or_create


class GetListByCategory(viewsets.ViewSet):
    def list(self, request, slug):
        queryset = Categories.objects.get(slug=slug).categories.all()
        serializer = ItemsSerializer(queryset, many=True)
        return Response(serializer.data)
