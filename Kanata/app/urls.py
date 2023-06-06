from django.urls import path
from .views import index, ChallengeImageInfo

urlpatterns = [
    path('', index),
    path('images/<int:id>', ChallengeImageInfo.as_view())
]
