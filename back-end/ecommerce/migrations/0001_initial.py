# Generated by Django 4.0.2 on 2022-02-26 22:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('dateCreated', models.DateTimeField(auto_now_add=True)),
                ('dataUpdated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=255, verbose_name='name')),
                ('image', models.ImageField(blank=True, null=True, upload_to='', verbose_name='image')),
            ],
            options={
                'verbose_name': 'category',
                'verbose_name_plural': 'categories',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('dateCreated', models.DateTimeField(auto_now_add=True)),
                ('dataUpdated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=255, verbose_name='name')),
                ('imageOne', models.ImageField(blank=True, upload_to='')),
                ('imageTwo', models.ImageField(blank=True, upload_to='')),
                ('imageThree', models.ImageField(blank=True, upload_to='')),
                ('imageFour', models.ImageField(blank=True, upload_to='')),
                ('short_description', models.TextField(blank=True, null=True, verbose_name='short description')),
                ('long_description', models.TextField(blank=True, null=True, verbose_name='long description')),
                ('countInStock', models.IntegerField(default=0, verbose_name='count in stock')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='price')),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='products', to='ecommerce.category', verbose_name='category')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]