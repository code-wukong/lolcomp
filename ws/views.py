# ws/views.py

from django.http import HttpResponse, HttpResponseRedirect
import json
import os
from ws.models import *
from lolcomp.helpers import im_jarvan

# retrieve constants for app sitedown
def cst_sitedown(request):
    if request.method == 'POST':
        post = json.loads(request.body)

        data = {
            'static_url': os.environ.get('DJANGO_STATIC_HOST', False),
            'jarvan': im_jarvan(),
        }
        
        if(post['test'] == 'wuju'):
            data['compromised'] = True
        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")

# retrieve constants for app main
def cst_main(request):
    if request.method == 'POST':
        post = json.loads(request.body)

        data = {
            'static_url': os.environ.get('DJANGO_STATIC_HOST', False),
            'jarvan': im_jarvan(),
        }
        
        if(post['test'] == 'wuju'):
            data['compromised'] = True
        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")
    
# retrieve constants for app internal
def cst_internal(request):
    if request.method == 'POST':
        post = json.loads(request.body)

        data = {
            'static_url': os.environ.get('DJANGO_STATIC_HOST', False),
            'ws': {
                'riot_api_request': 'ws/riot_api_request',
                'champion_create': 'ws/champion_create',
            },
        }
        
        if(post['test'] == 'wuju'):
            data['compromised'] = True
        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")
    
# send a request to riot api
def riot_api_request(request):
    if request.method == 'POST':
        post = json.loads(request.body)

        

        data = {
            'success': True,
            'data': json.dumps(post)
        }
        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")
    
# create champion from data
def champion_create(request):
    if request.method == 'POST':
        post = json.loads(request.body)

        

        data = {
            'success': True,
            'data': json.dumps(post['data'])
        }
        
#        if(post['test'] == 'wuju'):
#            data['compromised'] = True
        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")