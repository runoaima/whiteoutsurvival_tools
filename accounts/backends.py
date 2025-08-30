# accounts/backends.py
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

class UsernameOrEmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            # ユーザー名またはメールアドレスでユーザーを検索
            user = UserModel.objects.get(username=username)
        except UserModel.DoesNotExist:
            try:
                # ユーザー名が見つからない場合は、メールアドレスとして再検索
                user = UserModel.objects.get(email=username)
            except UserModel.DoesNotExist:
                # いずれでも見つからなければNoneを返す
                return None
        
        # パスワードが一致するか確認
        if user.check_password(password):
            return user
        return None