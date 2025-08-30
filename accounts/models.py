# accounts/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver

# カスタムユーザーモデルを定義
class CustomUser(AbstractUser):
    is_corporate = models.BooleanField(default=False)
    pass

# ユーザープロフィールモデル
class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE) # CustomUserを直接参照
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} Profile"

# CustomUserの作成後にProfileを自動作成
# senderにCustomUserを指定することで、コードの意図がより明確になります
@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

# CustomUser保存時にProfileも保存
@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

# 計算結果モデル
class CalculationResult(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='calculation_results')
    title = models.CharField(max_length=255)
    result_html = models.TextField()
    input_data = models.JSONField(null=True, blank=True)  # 入力データをJSON形式で保存
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title} - {self.user.username}'
    
    class Meta:
        ordering = ['-created_at']