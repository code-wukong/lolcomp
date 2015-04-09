# sitedown/urls.py

from django.conf.urls import url
from sitedown import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^', views.redirect_to_index),
]

