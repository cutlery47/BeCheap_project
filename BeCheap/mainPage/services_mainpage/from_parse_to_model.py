import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "BeCheap.settings")
from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
from mainPage.models import Items, Categories
from mainPage.services_mainpage.parser import get_parse_data


class Parse_to_model:

    def __init__(self, data):
        self.data = data

    def bd_filler(self):
        categorie_obj = Categories.objects.get(pk=1)
        for item in self.data:
            if not Items.objects.filter(item_name=item['name']).exists():
                new_row = Items.objects.create(item_name=item['name'],
                                               item_brand='',
                                               item_category=categorie_obj,
                                               item_cur_price=item['new_price'],
                                               item_prev_price=item['prev_price'],
                                               item_link='',
                                               item_image=item['img']
                                               )


Parse_to_model(get_parse_data()).bd_filler()
