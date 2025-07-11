from django.urls import path
from .views import Products
from .views import ProductsList
from .views import ProductsItem

urlpatterns = [
    path('create', Products.as_view()),
    path('list', ProductsList.as_view()),
    path('item', ProductsItem.as_view()),

]
