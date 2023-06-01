from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import docker

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