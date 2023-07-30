from django.db.models import QuerySet
from django.db.models.fields.related_descriptors import ManyToManyDescriptor

from django.db.models.utils import AltersData
from rest_framework.authtoken.admin import User
from mainPage.models import Items


class SlugMixin():
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'



class CreateFavorite():
    # User.objects.get(pk=request.user.id).user.get(Items.objects.get(pk=item_id))
    def add_to_favorites(self, request, From_query, **kwargs):
        if len(kwargs) != 1:
            raise "Должен быть 1 ключ и 1 значение"
        try:
            User.objects.get(pk=request.user.id).user.get(**kwargs)
            User.objects.get(pk=request.user.id).user.remove(From_query.objects.get(**kwargs))
            return False

        except From_query.DoesNotExist:
            User.objects.get(pk=request.user.id).user.add(From_query.objects.get(**kwargs))
            return True
