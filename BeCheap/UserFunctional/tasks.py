from django.core.serializers import deserialize
from django.apps import apps

from BeCheap.celery_app import app

from celery import shared_task
from rest_framework.authtoken.admin import User

from UserFunctional.services_userfunctional.favorite_manager import CreateFavorite


@shared_task()
def add_to_favorites_task(user_id: int, model_name: str, field_name: str, **kwargs) -> bool:
    # Таска берет на себя добавление в избранное
    return CreateFavorite().add_to_favorites(user_id, model_name, field_name, **kwargs)


