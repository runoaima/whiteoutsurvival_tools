from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    if not request.session.get("index_access_granted"):
        return redirect("password_protect")
    return render(request, "timers/index.html")

def timer(request):
    return render(request, "timers/timer.html")

# トップページ用パスワード
PAGE_PASSWORD = "12okm23"

def password_protect(request):
    if request.method == "POST":
        password = request.POST.get("password")
        if password == PAGE_PASSWORD:
            # セッションにフラグを保存
            request.session["index_access_granted"] = True
            return redirect("timers_index")
    return render(request, "timers/enter_password.html")