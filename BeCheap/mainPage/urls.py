from django.urls import path


from . import views

urlpatterns = [
    path('items/', views.GetItemsView.as_view({'get': 'list'})),
    path('items/<slug:slug_item>', views.GetItemsView.as_view({'get': 'retrieve'})),
    path('items/<slug:slug_category>', views.GetListByCategory.as_view({'get': 'retrieve'})),
]