from django.urls import path, include
from .views import ChallengeListView

urlpatterns = [
    path('', ChallengeListView.as_view())
]