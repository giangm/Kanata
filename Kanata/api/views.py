from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ContainerSerializer
from .models import Container
from docker.errors import DockerException
from django.db import IntegrityError
import docker
import os
import re
import sys

try:
    client = docker.from_env()
except DockerException as e:
    print("Please ensure that Docker Engine is running!")
    sys.exit(-1)

# Create your views here.
class ChallengeListView(APIView):
    serializer_class = ContainerSerializer
    
    def get_queryset(self):
        return Container.objects.all()
    
    def create_missing_containers(self, chall_dir):
        existing_names = set(Container.objects.values_list('name', flat=True))
        containers_to_create = []

        for cname in os.listdir(chall_dir):
            if cname != ".DS_Store" and cname not in existing_names:
                containers_to_create.append(Container(status="stopped", name=cname))

        Container.objects.bulk_create(containers_to_create)

    def update_all_containers(self, client):
        containers = client.containers.list()

        if len(containers) == 0:
            Container.objects.update(status="stopped")
        else:
            existing_names = set(Container.objects.values_list('name', flat=True))
            containers_to_create = []

            for container in containers:
                labels = container.labels
                cstatus = container.status
                nickname = container.name
                short_id = container.short_id
                attrs = container.attrs

                if labels["name"] in existing_names:
                    c = Container.objects.get(name=labels["name"])
                    c.status = cstatus
                    c.save()
                else:
                    containers_to_create.append(
                        Container(
                            nickname=nickname,
                            status=cstatus,
                            name=labels['name'],
                            desc=labels['desc'],
                            short_id=short_id,
                            attrs=attrs,
                        )
                    )

            Container.objects.bulk_create(containers_to_create)

    def get(self, request, format=None):
        chall_dir = os.path.join(os.path.abspath(os.path.join(settings.BASE_DIR, os.pardir)), 'Challenges')

        self.create_missing_containers(chall_dir)
        self.update_all_containers(client)

        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class ChallengeSolution(APIView):
    def get(self, request, format=None):
        name = request.query_params.get('name')
        if name == "":
            return Response({"data": "The name parameter cannot be empty."}, status=status.HTTP_404_NOT_FOUND)
        
        base_dir = os.path.abspath(os.path.join(settings.BASE_DIR, os.pardir))
        chall_dir = os.path.join(base_dir, 'Challenges', request.query_params.get('name'), 'documentation')

        num = len([f for f in os.listdir(chall_dir + '/images/') if os.path.isfile(os.path.join(chall_dir + '/images/', f))])

        with open(chall_dir + '/solution.md', 'r') as f:
            content = f.read()
            for i in range(1, num + 1):
                image = f'http://localhost:8000/images/{i}?name={name}'
                content = re.sub(r'!\[\]\(images/' + f'{i}.png', f'![]({image}/', content)

        return Response({"data": content}, status=status.HTTP_200_OK)

class ChallengeHints(APIView):
    def get(self, request, format=None):
        name = request.query_params.get('name')
        if name == "":
            return Response({"data": "The name parameter cannot be empty."}, status=status.HTTP_404_NOT_FOUND)
        
        base_dir = os.path.abspath(os.path.join(settings.BASE_DIR, os.pardir))
        chall_dir = os.path.join(base_dir, 'Challenges', name, 'documentation')

        with open(chall_dir + '/hint.md', 'r') as f:
            content = f.read()
        
        return Response({"data": content}, status=status.HTTP_200_OK)
    
class StopChallenge(APIView):
    def get(self, request, format=None):
        name = request.query_params.get('name')
        if name == "":
            return Response({"data": "The name parameter cannot be empty."}, status=status.HTTP_404_NOT_FOUND)
        
        container = Container.objects.get(name=name)
        serializer = ContainerSerializer(container)
        
        id = serializer.data["short_id"]
        docker_container = client.containers.get(id)
        docker_container.stop()
        
        container_model = Container.objects.get(name=name)
        container_model.delete()
        
        return Response({"data": "hi"}, status=status.HTTP_200_OK)

