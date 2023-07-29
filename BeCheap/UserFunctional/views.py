from rest_framework.views import APIView
from rest_framework.response import Response

from mainPage.models import Items
from mainPage.serializer import ItemsSerializer
from .models import Favorite
from rest_framework import permissions, generics, viewsets, status

from .serializer import FavoritesSerializer


class AddToFavoriteView(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def get(self, request):
        queryset = Favorite.objects.all()
        serializer = FavoritesSerializer(queryset, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = FavoritesSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            if serializer.save():
                return Response({"message": "Добавлено в избранное"})
            return Response({"message": "Удалено из избранного"})
        except:
            return Response({"errors": serializer.errors})
