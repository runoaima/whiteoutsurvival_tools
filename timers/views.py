from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "timers/index.html")

def timer(request):
    return render(request, "timers/timer.html")