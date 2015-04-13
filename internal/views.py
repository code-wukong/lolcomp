# internal/views.py

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login

def login(request):
    return render(request, 'registration/login.html', {'question': 'test'})
        
@ensure_csrf_cookie
@login_required(login_url="/login/")
def index(request):
    question = 2
    return render(request, 'views/internal.html', {'question': question})

