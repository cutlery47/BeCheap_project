import os
from celery import Celery
from celery.schedules import crontab
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'keepitcheap.settings')

app = Celery('keepitcheap')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()



# запуск переодической задачи celery по парсингу данных
app.conf.beat_schedule = {
    'parse_every_30_minutes': {
        'task': 'keepitcheap.tasks.parser',
        'schedule': crontab(minute='*/30'),
    }
}


