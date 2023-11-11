# Generated by Django 4.0.2 on 2022-02-27 09:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0006_orderitem'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('dateCreated', models.DateTimeField(auto_now_add=True)),
                ('dataUpdated', models.DateTimeField(auto_now=True)),
                ('total', models.DecimalField(decimal_places=0, max_digits=1000, verbose_name='total')),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerce.address', verbose_name='address')),
                ('items', models.ManyToManyField(related_name='order', to='ecommerce.OrderItem', verbose_name='order items')),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='ecommerce.orderstatus', verbose_name='status')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
