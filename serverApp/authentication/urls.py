from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterView.as_view() , name="resgiter_user"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('profile/',  ProfileView.as_view(), name="user_profile"),
    path('findusers/<str:search>', SearchUserView.as_view(), name='find-users')
]