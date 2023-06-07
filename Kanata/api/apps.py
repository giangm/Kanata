from django.apps import AppConfig
import docker


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    client = docker.from_env()

    def ready(self):  
        from .models import Container  
        for container in self.client.containers.list():
            nickname = container.name
            labels = container.labels
            cstatus = container.status
            short_id = container.short_id
            attrs = container.attrs

            Container.objects.get_or_create(nickname=nickname, status=cstatus, name=labels['name'], desc=labels['desc'], short_id=short_id, attrs=attrs)