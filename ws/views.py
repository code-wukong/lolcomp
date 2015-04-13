# ws/views.py

from django.http import HttpResponse
from django.http import HttpResponseRedirect
import json
from lolcomp.helpers import *
import os
import requests
from ws.models import *

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
        try:
            query = Static.objects.filter(label=CST['champ_data'])
            definition = json.loads(query[0].definition)

            data = {
                'version': definition['version']
            }
        except:
            data = {'version': 'error'}
        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")
    
    
# update the static data champ singleton
def update_champs_data(request):
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
        try:
            query_set = Static.objects.filter(label=CST['champ_data'])
            obj = query_set[0]
            obj.definition = json.dumps(r.json())
            obj.save()
        except:
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
       
# get/set config data singleton
def rw_static_def(request):
    if request.method == 'POST':
        '''
        expected_object = {
            label: "config",
            mode: "write",
            data: data_to_write
        }
        '''
        post = json.loads(request.body)
        singleton = post['label']
        data_to_write = post.get('data', {})
        create_new_flag = False
        
        if(post['mode'] == 'read'):
            try:
                query_set = Static.objects.filter(label=CST[singleton])
                data = json.loads(query_set[0].definition)
            except:
                create_new_flag = True
                data = data_to_write
        elif(post['mode'] == 'write'):
            # overwrite the previous data
            try:
                query_set = Static.objects.filter(label=CST[singleton])
                obj = query_set[0]
                obj.definition = json.dumps(data_to_write)
                obj.save()
            except:
                create_new_flag = True
                
            data = {
                'status': "success - wrote " + CST[singleton],
            }
            
            
        if(create_new_flag == True):
            static_create({
                'label': CST[singleton],
                'definition': json.dumps(data_to_write)
            })
            
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")
    