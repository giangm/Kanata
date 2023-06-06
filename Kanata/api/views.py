from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import docker
import os
import re

client = docker.from_env()

# Create your views here.
class ChallengeListView(APIView):
    def get(self, request, format=None):
        containers = {}
        counter = 0
        for container in client.containers.list():
            print(container)
            nickname = container.name
            labels = container.labels
            cstatus = container.status
            shortId = container.short_id
            attrs = container.attrs

            containers[counter] = [nickname, cstatus, labels["name"], labels["desc"], shortId, attrs]
            counter += 1

        return Response({"data": containers}, status=status.HTTP_200_OK)

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
        name = request.query_params.get('name')
        base_dir = os.path.abspath(os.path.join(settings.BASE_DIR, os.pardir))
        chall_dir = os.path.join(base_dir, 'Challenges', request.query_params.get('name'), 'documentation')

        with open(chall_dir + '/hint.md', 'r') as f:
            content = f.read()
        
        return Response({"data": content}, status=status.HTTP_200_OK)
