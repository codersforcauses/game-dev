"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from game_dev import views
from rest_framework import routers

Games_API_Router = routers.DefaultRouter()
Games_API_Router.register(r'games', views.GamesView, 'game')


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/healthcheck/", include(("api.healthcheck.urls"))),
    path("gamesAPI/", include(Games_API_Router.urls))
]
