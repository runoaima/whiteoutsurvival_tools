# accounts/views.py
from django.shortcuts import render, redirect, get_object_or_404
from .forms import SignUpForm, Userform, ProfileForm
from django.contrib.auth import login, get_user_model
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Profile
from django.http import JsonResponse
import json
from .models import CalculationResult

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
    # ユーザーに関連するすべての計算結果を取得
    calculation_results = user.calculation_results.order_by('-created_at')
    return render(request, 'accounts/profile.html', {
        'profile_user': user,
        'calculation_results': calculation_results
    })

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
    
# JSONレスポンスを返すためのインポート
@login_required
def save_calculation_result(request):
    if request.method == 'POST' and request.user.is_authenticated:
        try:
            data = json.loads(request.body)
            CalculationResult.objects.create(
                user=request.user,
                title=data.get('title', '無題の計算結果'),
                result_html=data.get('result_html'),
                input_data=data.get('input_data')
            )
            return JsonResponse({'status': 'success', 'message': '計算結果が保存されました'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request or not authenticated'}, status=403)

# 計算結果削除ビュー
@login_required
def delete_calculation_result(request, result_id):
    result = get_object_or_404(CalculationResult, id=result_id)
    
    # 本人の結果、または管理者のみ削除可能
    if request.user == result.user or request.user.is_superuser:
        result.delete()
        # 削除後にプロフィールページへリダイレクト
        return redirect('profile', username=request.user.username)
    else:
        # 権限がない場合は、削除対象のプロフィールページへリダイレクト
        return redirect('profile', username=result.user.username)

# 計算履歴表示ビュー
@login_required
def save_calculation_result(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # CalculationResultモデルにデータを保存する
            CalculationResult.objects.create(
                user=request.user,
                title=data.get('title', '無題の計算結果'),
                result_html=data.get('result_html'),
                input_data=data.get('input_data')
            )
            
            return JsonResponse({'status': 'success', 'message': '計算結果が保存されました！'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': '無効なリクエスト'}, status=400)

@login_required
def calculation_history(request):
    """
    ユーザーの計算履歴を一覧表示するビュー
    """
    results = CalculationResult.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'accounts/calculation_history.html', {'results': results})