from django.urls import path
from rest_framework import routers
from rest_framework.routers import DefaultRouter

from . import views

# router = DefaultRouter()
# router.register(r'items', views.GetItemsView)

"""А мне неявное создание URL'а дороже 4х строк кода"""

urlpatterns = [
    path('items/category/<slug:slug>', views.GetListByCategory.as_view({'get': 'list'})),
    path('items/', views.GetItemsView.as_view({'get': 'get_all_items'})),
    path('items/<slug:slug>', views.GetItemsView.as_view({'get': 'get_one_item'}))
]

# urlpatterns += router.urls
