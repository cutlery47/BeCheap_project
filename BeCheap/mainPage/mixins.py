from django.db.models import QuerySet
from django.db.models.fields.related_descriptors import ManyToManyDescriptor

from django.db.models.utils import AltersData
from rest_framework.authtoken.admin import User
from mainPage.models import Items


class SlugMixin():
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'





