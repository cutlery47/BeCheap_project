from django.urls import path
from rest_framework import routers
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'items', views.GetItemsView)

"""А мне неявное создание URL'а дороже 4х строк кода"""

urlpatterns = [
    path('items/category/<slug:slug>', views.GetListByCategory.as_view({'get': 'list'})),
    path('items/add/<int:item_id>', views.AddToFavorite.as_view()),
    path('category/add/<int:category_id>', views.AddToSubscription.as_view()),
    path('<str:user_name>/favorites', views.GiveUserFavorites.as_view()),
    path('<str:user_name>/categories', views.GiveUserCategories.as_view())
]

urlpatterns += router.urls