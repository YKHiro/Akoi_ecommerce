from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.paginator import Paginator
from .models import Product, ProductImage
from .serializers import ProductSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q

import uuid
from django.utils.deconstruct import deconstructible


def Rename(filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4().hex}"
    
    return filename+"."+ext



class Products(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        data = request.data.copy()
        tags = data.get('tags', '[]')
        data['tags'] = eval(tags) if isinstance(tags, str) else tags
        
        main_image = request.FILES.get('image')
        main_image.name = Rename(main_image.name)

        product = Product.objects.create(
            category=data.get('category'),
            name=data.get('name'),
            description=data.get('description'),
            price=data.get('price'),
            old_price=data.get('old_price', None),
            in_stock=data.get('in_stock'),
            tags=data['tags'],
            image=main_image,
        )
        
        for key, file in request.FILES.items():
            if key.startswith('image_list'):
                file.name = Rename(file.name)
                ProductImage.objects.create(product=product, image=file)  
        
        return Response(ProductSerializer(product).data)
    
    def put(self, request):
        product_id = request.data.get('id')
        product = get_object_or_404(Product, id=product_id)

        data = request.data.copy()
        tags = data.get('tags', '[]')
        data['tags'] = eval(tags) if isinstance(tags, str) else tags

        # Update main fields
        product.category = data.get('category', product.category)
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.price = data.get('price', product.price)
        product.old_price = data.get('old_price', product.old_price)
        product.in_stock = data.get('in_stock', product.in_stock)
        product.tags = data.get('tags', product.tags)

        # Handle main image if updated
        if 'image' in request.FILES:
            image = request.FILES['image']
            image.name = Rename(image.name)
            product.image = image

        product.save()

        # Optionally handle additional images
        for key, file in request.FILES.items():
            if key.startswith('image_list'):
                file.name = Rename(file.name)
                ProductImage.objects.create(product=product, image=file)

        return Response(ProductSerializer(product, context={'request': request}).data)


class ProductsItem(APIView):
    def get(self, request):
        product_id = request.query_params.get('id')

        if product_id:
            product = get_object_or_404(Product, id=product_id)
            serializer = ProductSerializer(product, context={'request': request})
            return Response({
                'id': product_id,
                'products': [serializer.data],
            })
            

class ProductsList(APIView):

    def get(self, request):
        tags = request.GET.getlist('tag')  # get ?tag=android&tag=5G&tag=touchscreen
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', 10))
        search = request.GET.get('search', '').strip() 

        combined_query = Q()

        if tags:
            tag_query = Q()
            for tag in tags:
                tag_query |= Q(tags__contains=[tag])
            combined_query |= tag_query

        if search:
            combined_query |= Q(name__icontains=search)
            combined_query |= Q(tags__icontains=search)  # searches search string inside tags array

        products = Product.objects.all()
        if combined_query:
            products = products.filter(combined_query).distinct()

        paginator = Paginator(products, page_size)
        page_obj = paginator.get_page(page)
        serializer = ProductSerializer(page_obj.object_list, many=True, context={'request': request})
        return Response({
            'page': page,
            'page_size': page_size,
            'total_pages': paginator.num_pages,
            'total_products': paginator.count,
            'products': serializer.data,
        })
