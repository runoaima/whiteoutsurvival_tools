from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="materials_index"),
    path("fireCrystal/", views.fireCrystal, name="fire_crystal"),
    path("chief_gear/", views.chief_gear, name="chief_gear"),
    path("hero_gear/", views.hero_gear, name="hero_gear"),
]