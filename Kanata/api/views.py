import re

from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .containers import *
from .serializers import ContainerSerializer

# Create your views here.
class List(APIView):
    serializer = ContainerSerializer

    def get(self, request, format=None):
        dir = os.path.join(os.path.abspath(os.path.join(settings.BASE_DIR, os.pardir)), "Challenges")

        create_missing_containers(dir)
        update_all_containers(client)

        queryset = get_queryset_all()
        serializer = self.serializer(queryset, many=True)

        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

class Information(APIView):
    serializer = ContainerSerializer

    def get(self, request, format=None):
        data = {}

        name = request.query_params.get("name")
        if name == "":
            return Response({"data": "The name parameter cannot be empty."}, status=status.HTTP_404_NOT_FOUND)
        
        documentation_dir = os.path.join(settings.CHALLENGE_DIR, name, "documentation")
        images_dir = os.path.join(documentation_dir, "images")
        
        queryset = get_queryset_by_name(name)
        serializer = self.serializer(queryset, many=True)

        data["information"] = serializer.data[0]

        num = len([f for f in os.listdir(images_dir) if os.path.isfile(os.path.join(images_dir, f))])
        with open(documentation_dir + "/solution.md", "r") as f:
            content = f.read()
            for i in range(1, num + 1):
                image = f"http://localhost:8000/images/{i}?name={name}"
                content = re.sub(r"!\[\]\(images/" + f"{i}.png", f"![]({image}/", content)
        data["solution"] = content        
        
        with open(documentation_dir + "/hint.md", "r") as f:
            content = f.read()
        data["hints"] = content

        return Response({"data": data}, status=status.HTTP_200_OK)
    
class Stop(APIView):
    def get(self, request, format=None):
        name = request.query_params.get("name")
        if name == "":
            return Response({"data": "The name parameter cannot be empty."}, status=status.HTTP_404_NOT_FOUND)
        
        container = get_object_or_404(Container, name=name)
        short_id = container.short_id

        docker_container = client.containers.get(short_id)
        docker_container.stop()

        return Response({"data": f"The {name} container has been stopped successfully."}, status=status.HTTP_200_OK)