# main/urls.py

from django.conf.urls import url
from main import views

urlpatterns = [
    url(r'^$', views.index),
]