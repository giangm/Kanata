from django.urls import path
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import ChallengeListView, ChallengeInfoView

schema_view = get_schema_view(
    openapi.Info(
        title="Kanata API",
        default_version='v1',
        description="API endpoints used for Kanata web application",
    ),
    public=False,
    permission_classes=(AllowAny,),
)

urlpatterns = [
    path('', schema_view.with_ui('swagger', cache_timeout=0)),
    path('challengelist', ChallengeListView.as_view()),
    path('challengeinfo', ChallengeInfoView.as_view())
]