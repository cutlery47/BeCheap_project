from rest_framework import permissions, generics
from .models import Items
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ItemsSerializer


class GetItemsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Items.objects.all()
    serializer_class = ItemsSerializer

