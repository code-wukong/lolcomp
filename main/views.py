# main/views.py

from django.shortcuts import render
from django.http import HttpResponseRedirect

def index(request):
    question = 2
    return render(request, 'views/main.html', {'question': question})

def redirect_to_index(request):
    return HttpResponseRedirect("/")