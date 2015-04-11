# ws/urls.py

from django.conf.urls import url
from ws import views

urlpatterns = [
    url(r'^cst_sitedown$', views.cst_sitedown),
    url(r'^cst_main$', views.cst_main),
]

