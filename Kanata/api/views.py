from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ContainerSerializer
from .models import Container
import docker
import os
import re

client = docker.from_env()

# Create your views here.
class ChallengeListView(APIView):
    serializer_class = ContainerSerializer
    
    def get_queryset(self):
        return Container.objects.all()
    
    def get(self, request, format=None):
        chall_dir = os.path.join(os.path.abspath(os.path.join(settings.BASE_DIR, os.pardir)), 'Challenges')
        
        for cname in os.listdir(chall_dir):
            if cname != ".DS_Store":
                Container.objects.get_or_create(status="stopped", name=cname)

        for container in client.containers.list():
            if not Container.objects.filter(name=container.labels["name"]).exists():
                nickname = container.name
                labels = container.labels
                cstatus = container.status
                short_id = container.short_id
                attrs = container.attrs
                Container.objects.get_or_create(nickname=nickname, status=cstatus, name=labels['name'], desc=labels['desc'], short_id=short_id, attrs=attrs)
            
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    
    # def get(self, request, format=None):
        
    #     containers = {}
    #     counter = 0
    #     for container in client.containers.list():
    #         print(container)
    #         nickname = container.name
    #         labels = container.labels
    #         cstatus = container.status
    #         short_id = container.short_id
    #         attrs = container.attrs

    #         containers[counter] = [nickname, cstatus, labels["name"], labels["desc"], short_id, attrs]
    #         counter += 1
        # serializer = self.serializer_class(self.queryset, many=True)
        # return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        # return Response({"data": self.queryset}, status=status.HTTP_200_OK)

class ChallengeSolution(APIView):
    def get(self, request, format=None):
        name = request.query_params.get('name')
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
        base_dir = os.path.abspath(os.path.join(settings.BASE_DIR, os.pardir))
        chall_dir = os.path.join(base_dir, 'Challenges', request.query_params.get('name'), 'documentation')

        with open(chall_dir + '/hint.md', 'r') as f:
            content = f.read()
        
        return Response({"data": content}, status=status.HTTP_200_OK)
    
class StopChallenge(APIView):
    def get(self, request, format=None):
        name = request.query_params.get('name')
        container = Container.objects.get(name=name)
        serializer = ContainerSerializer(container)
        id = serializer.data["short_id"]
        docker_container = client.containers.get(id)
        docker_container.stop()
        container_model = Container.objects.get(name=name)
        container_model.delete()
        return Response({"data": "hi"}, status=status.HTTP_200_OK)

