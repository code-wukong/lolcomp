# internal/urls.py

from django.conf.urls import url
from internal import views

urlpatterns = [
    url(r'^$', views.index),
]