# lolcomp/urls.py

from django.conf.urls import include, url
from django.contrib import admin
from home import views as views_home
from sitedown import views as views_sitedown

from django.views.generic.base import RedirectView

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'home', views_home.index),
    url(r'sitedown', views_sitedown.index),
]

#RedirectView.as_view(url='/', permanent=False), name='index'