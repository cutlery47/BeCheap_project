from django.apps import apps
from rest_framework.authtoken.admin import User
from mainPage.models import Items, Categories


# Класс, реализующий добавление в избранное
class CreateFavorite():
    # функция вынимает related name из модели, нужна для унифицированного использования ко всем возможным подпискам
    def related_name(self, model_class, field_name: str) -> str:
        return model_class._meta.get_field(field_name).related_query_name()

    # функция добавления в избранное
    def add_to_favorites(self, user_id: int, model_name: str, field_name: str, **kwargs) -> bool:
        if len(kwargs) != 1:
            """Ошибка, если тут хуйня пришла, но хуйня прийти не может, так что я хз"""
            raise ValueError("There should be 1 key and 1 value")
        model_class = apps.get_model(app_label="mainPage", model_name=model_name)  # вынимает модель по её имени
        user = User.objects.get(pk=user_id)  # вынимает юзера из реквеста
        # вынимает все связанные объекты по related
        favorites = getattr(user, self.related_name(model_class, field_name))
        try:
            """Если у юзера уже есть в избранном, то удаляем"""
            favorites.get(**kwargs)
            favorites.remove(model_class.objects.get(**kwargs))
            return False
        except model_class.DoesNotExist:
            """Если у юзера нет в избранном, то добавляем"""
            favorites.add(model_class.objects.get(**kwargs))
            return True
