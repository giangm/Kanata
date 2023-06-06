from imagekit import ImageSpec, register
from imagekit.processors import ResizeToFill

class ResizedImage(ImageSpec):
    processors = [ResizeToFill(100, 200)]
    
    format = 'PNG'
    options = {'quality': 90}

register.generator('myapp:resizedimage', ResizedImage)