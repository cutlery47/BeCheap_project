import os

import typing

from django.conf import settings
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

message_for_rised_price = 'На ваш товар в избранном увеличилась цена'
message_for_reducted_price = 'На ваш товар в избранном снизилась цена'
message_for_deleted_items = 'На товар больше не действует скидка'
message_for_new_in_subs = "В категории появились новые товары"

class CompareParseWithModel:
    def __init__(self, data: typing.Dict[str, typing.Dict[str, str]]) -> None:
        if not data:
            raise ValueError("Пиздец")
        self.data = data
        self.new_categories_list = []
        self.updated_items = []
        self.deleted_items = []

    def compare_and_fill(self):
        query = Items.objects.all().values('item_name', 'id')
        for item_name_id in query:
            """Проверяем есть ли предмет из базы данных в новых данных из парсера"""
            if item_name_id['item_name'] in self.data:
                """Если есть, то либо обновляем данные, либо ничего не делаем"""
                item = Items.objects.get(id=int(item_name_id['id']))
                if item.item_cur_price != self.data[item_name_id['item_name']]['new_price']:
                    if item.item_cur_price < self.data[item_name_id['item_name']]['new_price']:
                        # updated - предметы на которые обновилась
                        self.updated_items.append((item, message_for_rised_price))
                    else:
                        self.updated_items.append((item, message_for_reducted_price))
                    item.item_cur_price = self.data[item_name_id['item_name']]['new_price']
                    item.item_prev_price = self.data[item_name_id['item_name']]['prev_price']
                    item.save()
                self.data[item_name_id['item_name']] = None
            elif item_name_id['item_name'] not in self.data:
                """Если нет, то на предмет кончилась скидка"""
                item = Items.objects.get(id=int(item_name_id['id']))

                for user in item.favorites.all():
                    self.deleted_items.append((user, item.item_name, message_for_deleted_items, item.item_image))
                    cache.delete(f'{user.id}_{settings.FAVORITES_CACHE_NAME}')

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
    def __init__(self, data: typing.Dict[str, typing.Dict[str, str]]) -> None:
        super().__init__(data)
        self.telegram_sub_notifications_list = []
        self.telegram_favorites_notifications_list = []
        self.telegram_deleted_favorites_notifications_list = []

    def construct_message_for_user(self, message, item_name):
        return item_name + "\n" + message

    def construct_message_for_sub(self, cat_name):
        return f"В категории {cat_name} появились новые товары"

    def get_user_telegram_id(self, user_entity):
        telegram_profile = user_entity.user_telegram.values_list('telegram_user_id', 'is_telegram_subscriber')
        if telegram_profile:  # есть ли пользователь в тг боте
            user_telegram_id = telegram_profile.get()[0]  # в values_list 1й элемент - id
            user_permission = telegram_profile.get()[1]  # второй - разрешение юзера на рассылку
            if user_permission:  # хочет ли юзер получать уведомления
                return user_telegram_id
            return None
        return None

    def create_sub_notification_info_for_telegram(self, user, category):
        user_telegram_id = self.get_user_telegram_id(user)
        if user_telegram_id:  # если юзер есть в боте, то все норм
            message = self.construct_message_for_sub(category.category_name)
            self.telegram_sub_notifications_list.append((user_telegram_id, message))

    def get_telegram_sub_notifications_list(self):
        if self.new_categories_list:
            for category in self.new_categories_list:
                try:
                    category = Categories.objects.get(category_name=category)
                    for user in category.subscriptions.all():
                        self.create_sub_notification_info_for_telegram(user, category)  # кладёт уведомления для телеги
                except Categories.DoesNotExist:
                    "Создает новую категорию, просто чтобы наполнить базу данных"
                    Categories.objects.create(category_name=category)

            return self.telegram_sub_notifications_list
        return None

    def get_deleted_favorites_notification_info_for_telegram(self):
        if self.deleted_items:
            for item in self.deleted_items:
                self.create_telegram_deleted_favorites_notifications_list(*item)
            return self.telegram_deleted_favorites_notifications_list
        return None

    def create_telegram_deleted_favorites_notifications_list(self, user, item_name, message, item_image):
        user_telegram_id = self.get_user_telegram_id(user)
        if user_telegram_id:
            message = self.construct_message_for_user(message, item_name)
            self.telegram_deleted_favorites_notifications_list.append((user_telegram_id,
                                                                       item_image,
                                                                       message,
                                                                       ))

    def create_item_notification_info_for_telegram(self, user, item, message):
        user_telegram_id = self.get_user_telegram_id(user)
        if user_telegram_id:  # если юзер есть в боте, то все норм
            message = self.construct_message_for_user(message, item.item_name)
            """Сильная привязанность к порядку элементов, так в этом же порядке будут передаваться в тг бот"""
            self.telegram_favorites_notifications_list.append((user_telegram_id,
                                                               item.item_image,
                                                               message,))

    def get_telegram_favorites_notifications_list(self):
        if self.updated_items:
            for item, message in self.updated_items:
                for user in item.favorites.all():
                    self.create_item_notification_info_for_telegram(user, item, message)
            return self.telegram_favorites_notifications_list
        return None
