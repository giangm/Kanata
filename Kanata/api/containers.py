import docker
import sys
import os
import subprocess

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

def update_all_containers():
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

            container_info = {
                "nickname": nickname,
                "status": status,
                "name": labels["name"],
                "desc": labels["desc"],
                "short_id": short_id,
                "attrs": attrs,
            }

            if labels["name"] in existing_names:
                container_obj = Container.objects.get(name=labels["name"])
                Container.objects.filter(pk=container_obj.pk).update(**container_info)
            else:
                containers_to_create.append(Container(**container_info))

        Container.objects.bulk_create(containers_to_create)

def start_container(quickstart):
    try:
        subprocess.run(["bash", quickstart])
        update_all_containers()
        return True
    except Exception:
        return False

def stop_container(short_id):
    try:
        docker_container = client.containers.get(short_id)
        docker_container.stop()
        update_all_containers()
        return True
    except Exception:
        return False

def update_favourites(name, favourite):
    try:
        container_obj = Container.objects.get(name=name)
        container_obj.favourite = favourite
        container_obj.save()
        update_all_containers()
        return True
    except Exception:
        return False

def update_complete(name, complete):
    try:
        container_obj = Container.objects.get(name=name)
        container_obj.complete = complete
        container_obj.save()
        update_all_containers()
        return True
    except Exception:
        return False