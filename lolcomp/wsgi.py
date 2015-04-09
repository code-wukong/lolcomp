"""
WSGI config for lolcomp project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/howto/deployment/wsgi/
"""

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lolcomp.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

## Heroku
# https://devcenter.heroku.com/articles/getting-started-with-django
from dj_static import Cling
application = Cling(application)

## Static File Handling
# http://whitenoise.readthedocs.org/en/latest/django.html
from whitenoise.django import DjangoWhiteNoise
application = DjangoWhiteNoise(application)