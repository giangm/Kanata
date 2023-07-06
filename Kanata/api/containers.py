import docker
import sys
import os

from docker.errors import DockerException
from .models import Container

try:
    client = docker.from_env()
except DockerException as e:
    print("Please ensure that Docker Engine is running!")
    sys.exit(-1)


def get_queryset_all():
    return Container.objects.all()

def get_queryset_by_name(name):
    return Container.objects.filter(name=name)

def create_missing_containers(dir):
    existing_names = set(Container.objects.values_list("name", flat=True))
    containers_to_create = []

    for cname in os.listdir(dir):
        if cname != ".DS_Store" and cname not in existing_names:
            containers_to_create.append(
                Container(status="stopped", name=cname))

    Container.objects.bulk_create(containers_to_create)

def update_all_containers(client):
    containers = client.containers.list()

    if len(containers) == 0:
        Container.objects.update(status="stopped")
    else:
        existing_names = set(Container.objects.values_list("name", flat=True))
        containers_to_create = []

        for container in containers:
            labels = container.labels
            status = container.status
            nickname = container.name
            short_id = container.short_id
            attrs = container.attrs

            if labels["name"] in existing_names:
                container_obj = Container.objects.get(name=labels["name"])
                container_obj.status = status
                container_obj.save()
            else:
                containers_to_create.append(
                    Container(
                        nickname=nickname,
                        status=status,
                        name=labels["name"],
                        desc=labels["desc"],
                        short_id=short_id,
                        attrs=attrs,
                    )
                )

        Container.objects.bulk_create(containers_to_create)