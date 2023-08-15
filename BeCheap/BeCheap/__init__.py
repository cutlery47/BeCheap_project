from .celery_app import app as celery_app
from .celery_app2 import app as celery_app2

__all__ = ('celery_app', 'celery_app2')
