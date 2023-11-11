from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('products/', views.getProducts, name='products'),
    path('products/<str:pk>/', views.getProduct, name='product'),
    path('categories/', views.getCategories, name='categories'),
    path('cities/', views.getCities, name='cities'),
    path('create-order/', views.createOrder, name='create_order'),
]
