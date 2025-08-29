from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
import json
from django.template.loader import render_to_string
from datetime import datetime

# トップページ
def index(request):
    return render(request, "materials/index.html")

# 火晶計算ツール
def fireCrystal(request):
    return render(request, "materials/fire_crystal.html")

# 領主装備計算ツール
def chief_gear(request):
    return render(request, "materials/chief_gear.html")

# 英雄装備計算ツール
def hero_gear(request):
    return render(request, "materials/hero_gear.html")

# 領主宝石計算ツール
def chief_charm(request):
    return render(request, "materials/chief_charm.html")

# ヒーロースター計算ツール
def hero_star(request):
    return render(request, "materials/hero_star.html")