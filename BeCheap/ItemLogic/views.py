from django.shortcuts import render

# Create your views here.
from django.shortcuts import get_object_or_404
from rest_framework import generics

from mainPage.models import Items
from rest_framework.views import APIView
from rest_framework.response import Response
from mainPage.serializer import ItemsSerializer



