from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import index.routing
# from django.core.asgi import get_asgi_application !!!this is not working for django 2.2 !!!
import os
import django
from channels.http import AsgiHandler

# sys.path.append("/usr/local/lib/python3.7/dist-packages")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

application = ProtocolTypeRouter({
    # (your routes here)
    # "http": get_asgi_application(),
    "http": AsgiHandler(),
    'websocket':  AuthMiddlewareStack(
        URLRouter(
            index.routing.websocket_urlpatterns
        )
    ),
})