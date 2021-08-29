from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
# from index.views import IndexAPI, UserAPI, VideoAPI, CodeAPI
from index.views import CodeAPI, CodeMonitor

urlpatterns = [
    # url(r"index/", IndexAPI.as_view()),
    # url(r"login/", UserAPI.as_view()),
    url(r"code/", CodeAPI.as_view()),
    url(r"codemonitor", CodeMonitor.as_view()),
]
