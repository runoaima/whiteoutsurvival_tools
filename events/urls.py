from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="events_index"),
    path("hero_squads/", views.hero_squads, name="hero_squads"),
]