from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.views.generic import TemplateView

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/products/', include('products.urls')),
    path('api/user/', include('users.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('', TemplateView.as_view(template_name="index.html")),
]