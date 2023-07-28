from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'items', views.GetItemsView, basename='slug')

"""А мне неявное создание URL'а дороже 4х строк кода"""

urlpatterns = [
    path('items/category/<slug:slug>', views.GetListByCategory.as_view({'get': 'list'})),
]

urlpatterns += router.urls
