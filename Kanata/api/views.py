import re
import ast

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
        update_all_containers()

        queryset = get_queryset_all()
        serializer = self.serializer(queryset, many=True)

        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

class Information(APIView):
    serializer = ContainerSerializer

    def get(self, request, format=None):
        data = {}

        name = request.query_params.get("name")
        if name == "":
            return Response({"error": "The name parameter cannot be empty."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        documentation_dir = os.path.join(settings.CHALLENGE_DIR, name, "documentation")
        images_dir = os.path.join(documentation_dir, "images")
        
        queryset = get_queryset_by_name(name)
        serializer = self.serializer(queryset, many=True)

        data["desc"] = serializer.data[0]["desc"]
        data["status"] = serializer.data[0]["status"]
        data["favourite"] = serializer.data[0]["favourite"]

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

class Start(APIView):
    def get(self, request, format=None):
        name = request.query_params.get("name")
        if name == "":
            return Response({"error": "The name parameter cannot be empty."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        if start_container(name):
            return Response({"data": f"The {name} container has been started successfully."}, status=status.HTTP_200_OK)

        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Stop(APIView):
    def get(self, request, format=None):
        name = request.query_params.get("name")
        if name == "":
            return Response({"error": "The name parameter cannot be empty."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        container = get_object_or_404(Container, name=name)
        short_id = container.short_id
        if stop_container(short_id):
            return Response({"data": f"The {name} container has been stopped successfully."}, status=status.HTTP_200_OK)
        
        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class Favourite(APIView):
    def get(self, request, format=None):
        name = request.query_params.get("name")
        if name == "":
            return Response({"error": "The name parameter cannot be empty."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        favourite = request.query_params.get("favourite")
        if favourite is None:
            return Response({"error": "The name parameter cannot be empty."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if update_favourites(name, ast.literal_eval(favourite.capitalize())):
            return Response({"data": f"The {name} container has been updated successfully."}, status=status.HTTP_200_OK)

        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class Complete(APIView):
    def get(self, request, format=None):
        name = request.query_params.get("name")
        if name == "":
            return Response({"error": "The name parameter cannot be empty."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        complete = request.query_params.get("complete")
        if complete is None:
            return Response({"error": "The name parameter cannot be empty."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        if update_complete(name, ast.literal_eval(complete.capitalize())):
            return Response({"data": f"The {name} container has been updated successfully."}, status=status.HTTP_200_OK)
        
        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)