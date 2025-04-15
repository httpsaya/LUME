from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Vol(models.Model):
    title = models.CharField(max_length = 100)
    desc = models.CharField(max_length = 10000)
    image = models.ImageField(upload_to='vol_images/', null=True, blank=True)

class Vol2(models.Model):
    title = models.CharField(max_length = 100)
    desc = models.CharField(max_length = 10000)
    image = models.ImageField(upload_to='vol_images/', null=True, blank=True)

class Application(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vol = models.ForeignKey('Vol', on_delete=models.CASCADE)
    message = models.TextField(blank=True)
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} applied to {self.vol.title}"