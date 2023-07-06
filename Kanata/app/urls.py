from django.urls import path
from .views import index, Image

urlpatterns = [
    path('', index),
    path('images/<int:id>', Image.as_view())
]
