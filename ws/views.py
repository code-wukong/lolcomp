# ws/views.py

from django.http import HttpResponse, HttpResponseRedirect
import json, os, requests
from ws.models import *
from lolcomp.helpers import *

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

        settings = {
            'api_key': os.environ.get('RIOT_API_KEY', '')
        }
        for p in post['params']:
            settings[p] = post['params'][p]
        
        r = requests.get(API[post['url']], params=settings)

        data = {
            'status': r.status_code,
            'data': r.json()
        }
        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")
    
def get_installed_patch(request):
    if request.method == 'POST':
        query = Static.objects.filter(label=CST['champ_data'])
        definition = json.loads(query[0].definition)
        
        data = {
            'version': definition['version']
        }
        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")
    
    
# update the static data champ singleton
def update_static_data(request):
    if request.method == 'POST':
        # Make call to Riot API for all champ data
        settings = {
            'champData': 'all',
            'api_key': os.environ.get('RIOT_API_KEY', '')
        }

        url = API['static_data']
        r = requests.get(url, params=settings)
        data = r.json()

        # overwrite the previous data
        query_set = Static.objects.filter(label=CST['champ_data'])
        if(query_set != []):
            obj = query_set[0]
            obj.definition = json.dumps(r.json())
            obj.save()
        else:
            static_create({
                'label': CST['champ_data'],
                'definition': json.dumps(data)
            })
        
        data = {
            'status': r.status_code,
            'patch': data['version']
        }
        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")