from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets, generics
from .serializer import VolSerializer, Vol2Serializer
from .models import Vol, Vol2, Application
from .serializer import UserSerializer, ApplicationSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny

class VolViewSet(viewsets.ModelViewSet):
    queryset = Vol.objects.all()
    serializer_class = VolSerializer

class Vol2ViewSet(viewsets.ModelViewSet):
    queryset = Vol2.objects.all()
    serializer_class = Vol2Serializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [AllowAny]  # теперь любой может создать пользователя

class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)