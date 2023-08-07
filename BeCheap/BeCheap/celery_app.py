import os
import time
from django.core.cache import cache
from celery import Celery
from django.conf import settings
from mainPage.services_mainpage.parsing_manager import ParsingFunctional
from mainPage.services_mainpage.parser import get_parse_data
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BeCheap.settings')

app = Celery('BeCheap')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()




app.conf.beat_schedule = {
    'parse_every_10_minutes': {
        'task': 'BeCheap.tasks.parser',
        'schedule': crontab(minute='*/10'),
    }
}

