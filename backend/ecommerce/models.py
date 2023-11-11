from django.db import models


class Entity(models.Model):
    class Meta:
        abstract = True

    id = models.AutoField(primary_key=True, editable=False)
    dateCreated = models.DateTimeField(
        editable=False, auto_now_add=True)
    dataUpdated = models.DateTimeField(editable=False, auto_now=True)


class Product(Entity):
    name = models.CharField(verbose_name='name', max_length=255)
    imageOne = models.ImageField(blank=True)
    imageTwo = models.ImageField(blank=True)
    imageThree = models.ImageField(blank=True)
    imageFour = models.ImageField(blank=True)
    short_description = models.TextField(
        'short description', null=True, blank=True)
    long_description = models.TextField(
        'long description', null=True, blank=True)
    countInStock = models.IntegerField(
        'count in stock', default=0)
    price = models.DecimalField('price', max_digits=10, decimal_places=2)
    category = models.ForeignKey('ecommerce.Category', verbose_name='category', related_name='products',
                                 null=True,
                                 blank=True,
                                 on_delete=models.SET_NULL)

    def __str__(self):
        return f'{self.name} - {self.price}$'


class Category(Entity):
    name = models.CharField('name', max_length=255)
    image = models.ImageField('image', null=True, blank=True)

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class City(Entity):
    name = models.CharField('name', max_length=255)
    shipping_cost = models.IntegerField('shipping cost')

    class Meta:
        verbose_name = 'city'
        verbose_name_plural = 'cities'

    def __str__(self):
        return f'{self.name} - {self.shipping_cost}$'


class OrderStatus(Entity):
    NEW = 'NEW'
    PROCESSING = 'PROCESSING'
    SHIPPED = 'SHIPPED'
    COMPLETED = 'COMPLETED'
    REFUNDED = 'REFUNDED'

    title = models.CharField('title', max_length=255, choices=[
        (NEW, NEW),
        (PROCESSING, PROCESSING),
        (SHIPPED, SHIPPED),
        (COMPLETED, COMPLETED),
        (REFUNDED, REFUNDED),
    ])
    is_default = models.BooleanField('is default')

    class Meta:
        verbose_name = 'order status'
        verbose_name_plural = 'order statuses'

    def __str__(self):
        return self.title


class Address(Entity):
    firstName = models.CharField('first name', max_length=200)
    lastName = models.CharField('last name', max_length=200)
    phoneNumberOne = models.CharField('phone number one', max_length=11)
    phoneNumberTwo = models.CharField(
        'phone number two', max_length=11, null=True, blank=True)
    email = models.CharField('email', max_length=200, null=True, blank=True)
    street = models.CharField('street', max_length=200, null=True, blank=True)
    detailedAddress = models.CharField(
        'detailed address', max_length=400, null=True, blank=True)
    additionalInformation = models.CharField('additional information',
                                             max_length=400, null=True, blank=True)
    city = models.ForeignKey(
        City, related_name='addresses', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'address'
        verbose_name_plural = 'addresses'

    def __str__(self):
        return f'{self.firstName}  {self.lastName} - {self.city} - {self.phoneNumberOne}'


class OrderItem(Entity):
    product = models.ForeignKey('ecommerce.Product', verbose_name='product',
                                on_delete=models.CASCADE)
    quantity = models.IntegerField('item quantity')

    def __str__(self):
        return f'{self.product.name} - {self.quantity}'


class Order(Entity):
    total = models.DecimalField('total', max_digits=1000, decimal_places=0)
    address = models.ForeignKey(
        'ecommerce.Address', verbose_name='address', on_delete=models.CASCADE)
    status = models.ForeignKey('ecommerce.OrderStatus', verbose_name='status', related_name='orders',
                               on_delete=models.CASCADE)
    items = models.ManyToManyField(
        'ecommerce.OrderItem', verbose_name='order items', related_name='order')

    def __str__(self):
        return f'{self.address.firstName} {self.address.lastName} - {self.address.city.name} - {self.total}$ - {self.status} - Date: {self.dateCreated.date()}'
