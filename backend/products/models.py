from django.db import models

class Product(models.Model):
    category = models.CharField(max_length=100, default='')
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField()
    old_price = models.FloatField(null=True, blank=True)
    in_stock = models.IntegerField()
    tags = models.JSONField(default=list)
    image = models.ImageField(upload_to='main/', null=True, blank=True)

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='image_list', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='gallery/')
    

