from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from .models import Address, Product, Category, City, Order, OrderItem, OrderStatus
from .serializers import ProductSerializer, CategorySerializer, CitySerializer, OrderSerializer, OrderItemSerializer, OrderStatusSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


def getRoutes(request):
    routes = ['/api/products/']
    return JsonResponse(routes, safe=False)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()[::-1]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCities(request):
    cities = City.objects.all()
    serializer = CitySerializer(cities, many=True)
    return Response(serializer.data)


# ORDER - -------------------------------------------------------
@api_view(['GET', 'POST'])
def createOrder(request):

    # print(request.data, 'this is my data')
    orderData = request.data

    city = City.objects.get(name=orderData['city'])

    # Create shipping address
    address = Address.objects.create(
        firstName=orderData['firstName'],
        lastName=orderData['lastName'],
        phoneNumberOne=orderData['phoneNumberOne'],
        phoneNumberTwo=orderData['phoneNumberTwo'],
        email=orderData['email'],
        street=orderData['street'],
        detailedAddress=orderData['detailedAddress'],
        additionalInformation=orderData['additionalInformation'],
        city=city)

    # Create order
    order = Order.objects.create(
        total=orderData['totalCost'],
        address=address,
        status=OrderStatus.objects.get(is_default=True),
    )

    # Create order items
    orderItems = request.data['items']

    for i in orderItems:

        # get the product with the same id as the order item
        product = Product.objects.get(id=i['id'])

        item = OrderItem.objects.create(
            product=product,
            quantity=i['quantity'],
        )

        order.items.add(item)

        # Update stock

        product.countInStock -= item.quantity
        product.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)
