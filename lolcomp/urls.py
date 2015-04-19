# lolcomp/urls.py

from django.conf.urls import include, url
from django.contrib import admin

import os

## SITE_STATUS_FLAG
# 0 = sitedown
# 1 = normal
# 2 = 2x event

if(os.environ.get('SITE_STATUS_FLAG', '') == '0'):
    urlpatterns = [
        url(r'^ws/', include('ws.urls')),
        url(r'', include('sitedown.urls')),
    ]
else:
    urlpatterns = [
        url(r'^admin/', include(admin.site.urls)),
        url(r'^ws/', include('ws.urls')),
        url(r'^internal/', include('internal.urls')),
        url(r'^login/', 'django.contrib.auth.views.login', {'template_name': 'views/login.html'}),
        url(r'^logout/', 'django.contrib.auth.views.logout', {'next_page': '/'}),
        url(r'/.*', include('main.urls')),
        url(r'^$', include('main.urls')),
    ]

