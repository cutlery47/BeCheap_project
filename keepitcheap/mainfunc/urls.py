from django.urls import path
from rest_framework import routers
from rest_framework.routers import DefaultRouter

from . import views

# router = DefaultRouter()
# router.register(r'items', views.GetItemsView)

"""А мне неявное создание URL'а дороже 4х строк кода"""

urlpatterns = [
    path('items/category/<slug:slug>', views.GetListByCategory.as_view({'get': 'list'})),
    path('items/<int:page_number>', views.GetItemsView.as_view({'get': 'get_items'})),
    path('items/<slug:slug>', views.GetItem.as_view({'get': 'get_one_item'}))
]

# urlpatterns += router.urls
