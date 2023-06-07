from rest_framework import serializers
from .models import Container

class ContainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Container
        fields = ('id', 'nickname', 'status', 'name', 'desc', 'short_id', 'attrs', 'favourite')