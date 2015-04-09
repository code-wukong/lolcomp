from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse


# Create your views here.
def index(request):
    question = 2
    return render(request, 'views/sitedown.html', {'question': question})