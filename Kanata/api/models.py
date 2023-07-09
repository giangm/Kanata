from django.db import models

# Create your models here.
class Container(models.Model):
    # id = models.AutoField(primary_key=True)
    nickname = models.CharField(max_length=25, default="")
    status = models.CharField(max_length=25, default="")
    name = models.CharField(max_length=25, default="", unique=True)
    desc = models.CharField(max_length=255, default="")
    short_id = models.CharField(max_length=255, default="")
    attrs = models.CharField(max_length=255, default="")
    favourite = models.BooleanField(default=False)
    complete = models.BooleanField(default=False)

    def __str__(self):
        return self.name