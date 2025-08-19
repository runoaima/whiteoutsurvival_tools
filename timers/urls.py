from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="timers_index"),
    path("timer/", views.timer, name="timer"),
]