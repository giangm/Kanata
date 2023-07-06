import os

from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
def index(request):
    return render(request, "build/index.html")

class Image(APIView):
    def get(self, request, id, format=None):
        name = request.query_params.get("name")
        if name == "":
            return Response({"data": "The name parameter cannot be empty."}, status=status.HTTP_404_NOT_FOUND)
        
        image_name = str(id) + ".png"
        image = os.path.join(settings.CHALLENGE_DIR, name, "documentation", "images", image_name)

        with open(image, "rb") as f:
            return HttpResponse(f.read(), content_type="image/png")