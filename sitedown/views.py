from django.shortcuts import render
from django.http import HttpResponseRedirect


# Create your views here.
def index(request):
    question = 2
    return render(request, 'views/sitedown.html', {'question': question})

def redirect_to_index(request):
    return HttpResponseRedirect("/")