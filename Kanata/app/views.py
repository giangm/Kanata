from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse
from rest_framework.views import APIView
import os

# Create your views here.
def index(request):
    return render(request, "build/index.html")

class ChallengeImageInfo(APIView):
    def get(self, request, id, format=None):
        base_dir = os.path.abspath(os.path.join(settings.BASE_DIR, os.pardir))
        image_name = str(id) + ".png"

        img_dir = os.path.join(base_dir, 'Challenges', request.query_params.get('name'), 'documentation', 'images', image_name)    

        with open(img_dir, 'rb') as f:
            return HttpResponse(f.read(), content_type='image/png')