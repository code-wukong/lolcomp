# ws/views.py

from django.http import HttpResponse, HttpResponseRedirect
import json
import os
from sitedown.helpers import im_jarvan

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