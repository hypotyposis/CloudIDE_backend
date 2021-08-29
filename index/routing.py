from django.urls import path, re_path
from django.conf.urls import include, url
# from index.consumers import CodeConsumer
from . import consumers

websocket_urlpatterns = [
    # path('ws/code/', CodeConsumer.as_asgi()),
    re_path(r'ws/code/(?P<uid>\w+)/$', consumers.CodeConsumer.as_asgi()),
]