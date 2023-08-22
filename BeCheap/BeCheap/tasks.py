import time

from celery import Celery
from django.conf import settings
from django.core.cache import cache

from .celery_app import app
from mainPage.services_mainpage.parser import get_parse_data
from mainPage.services_mainpage.parsing_manager import ParsingFunctional






@app.task()
def delete_cached_items():
    cache.delete(f'{i}_{settings.ITEMS_CACHE_NAME}')



@app.task()
def compare_fill(pars_object: ParsingFunctional) -> None:
    pars_object.compare_and_fill()

@app.task()
def filler(pars_object: ParsingFunctional) -> None:
    pars_object.bd_filler()

@app.task()
def get_emails(pars_object: ParsingFunctional) -> None:
    emails_for_items = pars_object.get_emails_for_items()
    emails_for_categories = pars_object.get_emails_for_categories()


@app.task()
def parser():
    pars_object = ParsingFunctional(get_parse_data())
    compare_fill.delay(pars_object)
    filler.delay(pars_object)
    get_emails.delay()

    return emails_for_items, emails_for_categories





