# sitedown/views.py

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def index(request):
    question = 2
    return render(request, 'views/sitedown.html', {'question': question})

def redirect_to_index(request):
    return HttpResponseRedirect("/")