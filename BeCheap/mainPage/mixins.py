from django.db.models import QuerySet
from django.db.models.fields.related_descriptors import ManyToManyDescriptor

from django.db.models.utils import AltersData
from rest_framework.authtoken.admin import User
from mainPage.models import Items


class SlugMixin():
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'


class CreateFavorite():
    def related_name(self, From_model, field_name):
        return From_model._meta.get_field(field_name).related_query_name()
    # User.objects.get(pk=request.user.id).user.get(Items.objects.get(pk=item_id))
    def add_to_favorites(self, request, From_model, field_name, **kwargs):
        if len(kwargs) != 1:
            raise ValueError("There should be 1 key and 1 value")
        user = User.objects.get(pk=request.user.id)
        favorites = getattr(user, self.related_name(From_model, field_name))
        try:
            favorites.get(**kwargs)
            favorites.remove(From_model.objects.get(**kwargs))
            return False

        except From_model.DoesNotExist:
            user = User.objects.get(pk=request.user.id)
            favorites = getattr(user, self.related_name(From_model, field_name))
            favorites.add(From_model.objects.get(**kwargs))
            return True

class Pagination_class():
    pagination_size = 20
    query = None
    def get_page(self, page_number, serializer_class):
        page_query = self.query.objects.all()[
                     self.pagination_size * (page_number - 1):self.pagination_size * page_number]
        if page_query:
            serialize = serializer_class(page_query, many=True)
            return serialize.data
        else:
            return None