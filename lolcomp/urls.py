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
        url(r'', include('sitedown.urls')),
    ]
else:
    urlpatterns = [
        url(r'^admin/', include(admin.site.urls)),
        url(r'^$', include('main.urls')),
    ]

