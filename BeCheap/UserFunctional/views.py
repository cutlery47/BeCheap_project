from rest_framework.views import APIView
from rest_framework.response import Response

from mainPage.models import Items
from mainPage.serializer import ItemsSerializer
from .models import Favorite
from rest_framework import permissions, generics, viewsets, status

from .serializer import FavoritesSerializer


class AddToFavoriteView(APIView):

    def post(self, request):

        serializer = FavoritesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Хуйня"})
        else:
            print(serializer.errors)
            return Response({"message": "Хуйня переделывай"})
