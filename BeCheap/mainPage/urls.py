from django.urls import path


from . import views

urlpatterns = [
    path('items/', views.GetItemsView.as_view()),
]