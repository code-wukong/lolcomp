# ws/urls.py

from django.conf.urls import url
from ws import views

urlpatterns = [
    url(r'^cst_sitedown$', views.cst_sitedown),
    url(r'^cst_main$', views.cst_main),
    url(r'^cst_internal$', views.cst_internal),
    url(r'^riot_api_request$', views.riot_api_request),
    url(r'^get_installed_patch$', views.get_installed_patch),
    url(r'^update_champs_data$', views.update_champs_data),
    url(r'^rw_static_def$', views.rw_static_def),
]