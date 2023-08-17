from django.urls import path
from . import views

"""А мне неявное создание URL'а дороже 4х строк кода"""

urlpatterns = [
    path('items/category/<slug:slug>', views.GetListByCategory.as_view({'get': 'list'})),
    path('items/add/<int:item_id>', views.AddToFavorite.as_view()),
    path('items/<int:page_number>', views.GetItemsView.as_view({'get': 'get_items'})),
    path('items/<slug:slug>', views.GetItem.as_view({'get': 'get_one_item'})),
    path('category/add/<int:category_id>', views.AddToSubscription.as_view()),
    path('<str:user_name>/favorites', views.GiveUserFavorites.as_view()),
    path('<str:user_name>/categories', views.GiveUserCategories.as_view()),
]