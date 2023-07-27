
from django.urls import path


from . import views

urlpatterns = [
    path('items/<slug:slug_category>', views.GetItemsByCategory.as_view()),
]