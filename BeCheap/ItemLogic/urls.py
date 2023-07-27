
from django.urls import path


from . import views

urlpatterns = [
    path('item/<slug:slug_item>', views.GetItemView.as_view()),
]