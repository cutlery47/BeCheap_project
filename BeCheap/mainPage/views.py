from rest_framework import permissions, generics, viewsets
from .models import Items
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ItemsSerializer


class GetItemsView(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Items.objects.all().order_by("item_date")
    serializer_class = ItemsSerializer

class MixinForSlug():
    lookup_field = 'item_slug'
    lookup_url_kwarg = 'slug_item'


class GetItemView(MixinForSlug, generics.RetrieveAPIView):
    serializer_class = ItemsSerializer
    queryset = Items.objects.all()


