"""
WSGI config for keepitcheap project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
import sys
from pprint import pprint

from django.core.wsgi import get_wsgi_application
pprint(sys.path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'keepitcheap.settings')

application = get_wsgi_application()
