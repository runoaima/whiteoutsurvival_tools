from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="timers_index"),
    path("timer/", views.timer, name="timer"),
    path("enter_password/", views.password_protect, name="password_protect"),
]