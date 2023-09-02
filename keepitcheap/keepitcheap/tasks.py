from .celery_app import app
from keepitcheap.mainfunc.services_mainpage.parser import get_parse_data
from keepitcheap.mainfunc.services_mainpage.parsing_manager import ParsingFunctional
from keepitcheap.tg_bt import send_item_notification, send_category_notification







@app.task()
def compare_fill(pars_object: ParsingFunctional) -> None:
    pars_object.compare_and_fill()

@app.task()
def filler(pars_object: ParsingFunctional) -> None:
    pars_object.bd_filler()



@app.task()
def send_notification_about_new_fav_items(telegram_favorites_notifications_list: list):
    for notification in telegram_favorites_notifications_list:
        """Если порядок измениться в парсере, то пизда будет"""
        """Зато красиво"""
        send_item_notification(*notification)

@app.task()
def send_notification_about_new_in_categorys(telegram_sub_notifications_list: list):
    for notification in telegram_sub_notifications_list:
        send_category_notification(*notification)

@app.task()
def send_notification_about_deleted_items(telegram_deleted_favorites_notifications_list: list):
    for notification in telegram_deleted_favorites_notifications_list:
        send_item_notification(*notification)
@app.task()
def send_notifications(pars_object: ParsingFunctional) -> None:
    telegram_favorites_notifications_list = pars_object.get_telegram_favorites_notifications_list()
    telegram_sub_notifications_list = pars_object.get_telegram_sub_notifications_list()
    telegram_deleted_favorites_notifications_list = pars_object.get_deleted_favorites_notification_info_for_telegram()
    if telegram_favorites_notifications_list:
        send_notification_about_new_fav_items.delay(telegram_favorites_notifications_list)
    if telegram_sub_notifications_list:
        send_notification_about_new_in_categorys.delay(telegram_sub_notifications_list)
    if telegram_deleted_favorites_notifications_list:
        send_notification_about_deleted_items.delete(telegram_deleted_favorites_notifications_list)







@app.task()
def parser():
    pars_object = ParsingFunctional(get_parse_data())
    compare_fill.delay(pars_object)
    filler.delay(pars_object)
    send_notification_about_new_fav_items.delay(pars_object)






