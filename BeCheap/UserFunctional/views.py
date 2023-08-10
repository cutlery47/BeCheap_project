from rest_framework.views import APIView
from rest_framework.response import Response

from mainPage.models import Items
from mainPage.serializer import ItemsSerializer
from mainPage.models import Favorite
from rest_framework import permissions, generics, viewsets, status

from .serializer import FavoritesSerializer