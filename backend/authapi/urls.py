from django.urls import path
from .views import csrf, api_login, api_logout, me

urlpatterns = [
    path("api/csrf/", csrf),
    path("api/login/", api_login),
    path("api/logout/", api_logout),
    path("api/me/", me),
]
