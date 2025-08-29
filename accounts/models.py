from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

# カスタムユーザーモデル
class CustomUser(AbstractUser):
    is_corporate = models.BooleanField(default=False)
    pass

# ユーザープロフィールモデル
class Profile(models.Model):
    user = models.OneToOneField(
        # ここでカスタムユーザーを参照
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE
    )
    # 自己紹介
    bio = models.TextField(blank=True)      
    # プロフィール画像      
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)  
    # 住所
    location = models.CharField(max_length=30, blank=True)   
    # 生年月日
    birth_date = models.DateField(null=True, blank=True)    

    def __str__(self):
        return f"{self.user.username} Profile"

# CustomUserの作成後にProfileを自動作成
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

# CustomUser保存時にProfileも保存
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()