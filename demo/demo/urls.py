from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views
from rest_framework.authtoken.views import ObtainAuthToken
from django.conf import settings
from django.conf.urls.static import static

# Создаем роутер и регистрируем в нем наши ViewSets
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'volunteers', views.VolViewSet)
router.register(r'volunteers2', views.Vol2ViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),  # Админка Django
    path('api-auth/', ObtainAuthToken.as_view()),  # Страница для аутентификации
    path('api/', include(router.urls)),  # Все API роуты будут начинаться с /api/
    path('applications/', views.ApplicationCreateView.as_view(), name='application-create'),
]

# Настроим путь для медиафайлов
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)