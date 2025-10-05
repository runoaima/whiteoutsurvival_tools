# accounts/urls.py
from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    # ユーザー認証関連のURLパターン
    path('signup/', views.signup, name='signup'),
    # ログインとログアウトのビューをDjangoの組み込みビューで提供
    path('login/', auth_views.LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    # プロフィール関連のURLパターン
    path('profile/<str:username>/', views.profile, name='profile'),
    path('profile/<str:username>/edit/', views.edit_profile, name='edit_profile'),
    path('profile/<str:username>/delete/', views.delete_user, name='delete_user'),
    #path('activate/<uidb64>/<token>/', views.activate, name='activate'),
    path('calculation_history/', views.calculation_history, name='calculation_history'),
    path('save_calculation_result/', views.save_calculation_result, name='save_calculation_result'),
    path('result/<int:result_id>/delete/', views.delete_calculation_result, name='delete_calculation_result'),
]
# 