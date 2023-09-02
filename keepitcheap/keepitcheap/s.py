import os
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "keepitcheap.settings")
from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()

from rest_framework.authtoken.admin import User
from django.core.cache import cache
from UserFunctional.models import Profile
from UserFunctional.tasks import subscribe_or_unsubscribe_user