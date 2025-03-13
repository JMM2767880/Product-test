from django.conf import settings
from django.urls import re_path, path
from django.contrib import admin
from django.conf.urls.static import static
from .views import ProductListView, ProductDetailView, add_product_card_request

urlpatterns = [
    re_path(r'^$', ProductListView.as_view(), name='get-products'),
    path('product/<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),  # URL hacia plantilla que muestra los datos de un producto
    re_path(r'^add-product-card/$', add_product_card_request, name='add-product-card'),  # URL para añadir un producto a la cesta
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)