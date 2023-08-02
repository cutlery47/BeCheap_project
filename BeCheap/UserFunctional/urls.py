from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views


"""А мне неявное создание URL'а дороже 4х строк кода"""

urlpatterns = [
    path('items/add/<int:item_id>', views.AddToFavorite.as_view()),
    path('category/add/<int:category_id>', views.AddToSubscription.as_view()),
    path('user/favorites', views.GiveUserFavorites.as_view()),
    path('user/categories', views.GiveUserCategories.as_view())
]
