import os

from django.core.cache import cache
from django.utils.text import slugify

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "BeCheap.settings")
from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
from mainPage.models import Items, Categories
from mainPage.services_mainpage.parser import get_parse_data


# class Parse_to_model:
#     def __init__(self, data):
#         self.data = data
#
#     def bd_filler(self):
#
#         for item in self.data:
#             try:
#                 Items.objects.get(slug=slugify(item['name']))
#             except Items.DoesNotExist:
#
#
#
#
#
#


class CompareParseWithModel:
    def __init__(self, data):
        self.data = data
        self.new_categories_list = []
        self.updated_items = []

    def compare_and_fill(self):
        query = Items.objects.all().values('item_name', 'id')
        for item_name_id in query:
            """Проверяем есть ли предмет из базы данных в новых данных из парсера"""
            if item_name_id['item_name'] in self.data:
                """Если есть, то либо обновляем данные, либо ничего не делаем"""
                item = Items.objects.get(id=int(item_name_id['id']))
                if item.item_cur_price != self.data[item_name_id['item_name']]['new_price']:
                    if item.item_cur_price < self.data[item_name_id['item_name']]['new_price']:
                        self.updated_items.append((item, 'На ваш товар в избранном увеличилась цена'))
                    else:
                        self.updated_items.append((item, 'На ваш товар в избранном снизилась цена'))
                    item.item_cur_price = self.data[item_name_id['item_name']]['new_price']
                    item.item_prev_price = self.data[item_name_id['item_name']]['prev_price']
                    item.save()
                self.data[item_name_id['item_name']] = None
            elif item_name_id['item_name'] not in self.data:
                """Если нет, то на предмет кончилась скидка"""
                item = Items.objects.get(id=int(item_name_id['id']))

                for user in item.favorites.all():
                    cache.delete((f'{user.id}_favorites'))

                item.delete()
                self.data[item_name_id['item_name']] = None

    def bd_filler(self):
        for new_item in self.data:
            """Добавляем новые предметы из парсера"""
            if self.data[new_item]:

                item = self.data[new_item]
                if item['type'] not in self.new_categories_list:
                    self.new_categories_list.append(item['type'])
                categorie_obj = Categories.objects.get(category_name=item['type'])
                new_row = Items.objects.create(item_name=item['name'],
                                               item_brand='',
                                               item_category=categorie_obj,
                                               item_cur_price=item['new_price'],
                                               item_prev_price=item['prev_price'],
                                               item_link='',
                                               item_image=item['img']
                                               )


class ParsingFunctional(CompareParseWithModel):
    def __init__(self, data):
        super().__init__(data)
        self.emails_for_categories = []
        self.emails_for_items = []

    """Наполняем email'ы для увеомлений об обновленных данных"""

    """Все очень сырое """

    def get_emails_for_categories(self):
        if self.new_categories_list:
            for category in self.new_categories_list:
                try:
                    category = Categories.objects.get(category_name=category)
                    for user in category.subscriptions.all():
                        self.emails_for_categories.append((user.username, user.email, category))
                except Categories.DoesNotExist:
                    "Создает новую категорию сам, просто чтобы наполнить базу данных"
                    Categories.objects.create(category_name=category)

            return self.emails_for_categories
        return None

    def get_emails_for_items(self):
        if self.updated_items:
            for item, message in self.updated_items:
                for user in item.favorites.all():
                    self.emails_for_items.append((user.username, user.email, message, item.item_name))
            return self.emails_for_items
        return None
