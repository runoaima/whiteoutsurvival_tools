# accounts/views.py
from django.shortcuts import render, redirect, get_object_or_404
from .forms import SignUpForm, Userform, ProfileForm
from django.contrib.auth import login, get_user_model
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

# ユーザーにユーザーモデルを取得
User = get_user_model()

# ユーザー登録ビュー
def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect(settings.LOGIN_REDIRECT_URL)
    else:
        form = SignUpForm()
    return render(request, 'accounts/signup.html', {'form': form})

# プロフィール表示ビュー
def profile(request, username):
    user = get_object_or_404(User, username=username)
    return render(request, 'accounts/profile.html', {'profile_user': user})

# プロフィール編集ビュー
# ログイン必須
@login_required
def edit_profile(request, username):
    user = get_object_or_404(User, username=username)

    # 自分か管理者でなければ編集不可
    if request.user != user and not request.user.is_superuser:
        return redirect('profile', username=username)

    # 編集フォームの処理
    if request.method == 'POST':
        user_form = Userform(request.POST, instance=user)
        profile_form = ProfileForm(request.POST, request.FILES, instance=user.profile)

        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            return redirect('profile', username=username)
    else:
        user_form = Userform(instance=user)
        profile_form = ProfileForm(instance=user.profile)

    return render(request, 'accounts/edit_profile.html', {
        'user_form': user_form,
        'profile_form': profile_form,
        'profile_user': user
    })


# ユーザー削除ビュー
# ログイン必須
@login_required
def delete_user(request, username):
    user = get_object_or_404(User, username=username)

    # 自分自身か管理者だけ削除可能
    if request.user == user or request.user.is_superuser:
        user.delete()
        return redirect("home_index")
    else:
        return redirect("profile", username=username)