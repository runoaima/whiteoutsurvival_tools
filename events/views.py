from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "events/index.html")

def hero_squads(request):
    return render(request, "events/hero_squads.html")
