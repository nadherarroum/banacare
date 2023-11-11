from django.contrib import admin
from .models import Product, Category, City, OrderStatus, Address, OrderItem, Order


admin.site.register(Product)
admin.site.register(Category)
admin.site.register(City)
admin.site.register(OrderStatus)
admin.site.register(Address)
admin.site.register(OrderItem)
admin.site.register(Order)
