from rest_framework import permissions, generics, viewsets
from .models import Items, Categories
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ItemsSerializer


class GetItemsView(viewsets.ViewSet):
    def list(self, request):
        permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        queryset = Items.objects.all().order_by("item_date")
        serializer = ItemsSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, slug_item):
        queryset = Items.objects.get(item_slug=slug_item)
        serializer = ItemsSerializer(queryset)
        return Response(serializer.data)


class GetListByCategory(viewsets.ViewSet):
    def list(self, request, slug_category):
        queryset = Categories.objects.filter(category_slug=slug_category).categories.all()
        serializer = ItemsSerializer(queryset, many=True)
        return Response(serializer.data)
