from celery import shared_task
from .models import Profile
from .services_userfunctional.favorite_manager import CreateFavorite


@shared_task()
def add_to_favorites_task(user_id: int, model_name: str, field_name: str, **kwargs) -> bool:
    # Таска берет на себя добавление в избранное
    return CreateFavorite().add_to_favorites(user_id, model_name, field_name, **kwargs)


@shared_task()
def subscribe_or_unsubscribe_user(telegram_user_id: int, is_sub: bool) -> None:
    user = Profile.objects.get(telegram_user_id=telegram_user_id)
    user.is_telegram_subscriber = is_sub
    user.save()
