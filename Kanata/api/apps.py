from django.apps import AppConfig
from docker.errors import DockerException
from django.db import IntegrityError
import sys
import docker


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):  
        from .models import Container
        try:
            client = docker.from_env()
        except DockerException:
            print("Please ensure that Docker Engine is running!")
            sys.exit(-1)
            
        for container in client.containers.list():
            nickname = container.name
            labels = container.labels
            cstatus = container.status
            short_id = container.short_id
            attrs = container.attrs
            try:
                Container.objects.get_or_create(nickname=nickname, status=cstatus, name=labels['name'], desc=labels['desc'], short_id=short_id, attrs=attrs)
            except IntegrityError:
                continue
        