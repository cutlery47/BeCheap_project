import os



os.environ.setdefault("DJANGO_SETTINGS_MODULE", "keepitcheap.settings")
from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()

from django.conf import settings
from rest_framework.authtoken.admin import User
from django.core.cache import cache
from UserFunctional.models import Profile
from UserFunctional.tasks import subscribe_or_unsubscribe_user

import telebot
from telebot import types  # для указание типов
token = settings.BOT_KEY

bot = telebot.TeleBot(token)

# Настройки сообщений для юзера
message_for_non_auth_user = "Зайдите сюда по ссылке из вашего аккаунта и мы сможем отправлять вам уведомления"
new_auth_user_message = "Теперь вы будете получать рассылки и уведомления об обновлениях в ваших подписках"
message_for_auth_user = "Привет бобиджон"
message_for_unsub = "Вы отписались от рассылки"
message_for_sub = "Вы подписались на рассылку"
message_for_error = "ЭЭЭ, ты чо нахуй вообще сандали попутал, ты кому пишешь, гусь ебаный, эээ"

# Настройки для кнопок
message_for_button_unsub = "Отписаться от рассылки"
message_for_button_sub = "Подписаться на рассылку"


def get_keyboard(*args: str):
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    for message in args:
        markup.add(types.KeyboardButton(message))
    return markup


def is_auth_in_bot(message):
    try:
        Profile.objects.get(telegram_user_id=message.from_user.id)
        return True
    except Profile.DoesNotExist:
        return False


def bot_auth(message):
    text_message = message.text
    params = text_message.split()[1:]
    if len(params) != 1:  # человек перешел не по ссылке
        bot.send_message(message.chat.id, message_for_non_auth_user)
    else:
        url_token = params[0]
        user_id = cache.get(url_token)
        if user_id:  # все норм
            cache.delete(url_token)
            cache.delete(user_id)
            Profile.objects.create(user_id=User.objects.get(pk=user_id), telegram_user_id=message.from_user.id)
            bot.send_message(message.chat.id, new_auth_user_message,
                             reply_markup=get_keyboard(message_for_button_unsub))

        else:  # авторизация не удалась
            bot.send_message(message.chat.id, message_for_error)


# Хендлера на старт
@bot.message_handler(commands=['start'])
def start_message(message):
    if is_auth_in_bot(message):
        bot.send_message(message.chat.id, message_for_auth_user, reply_markup=get_keyboard(message_for_button_unsub))
    else:
        bot_auth(message)


def send_item_notification(chat_id: int, url_photo: str, message: str):
    bot.send_photo(chat_id, url_photo, caption=message)


def send_category_notification(chat_id: int, text: str):
    bot.send_message(chat_id, text)


@bot.message_handler(content_types=['text'])
def text_handler(message):
    if message.text == message_for_button_unsub:
        subscribe_or_unsubscribe_user.delay(message.from_user.id, False)
        bot.send_message(message.chat.id, text=message_for_unsub, reply_markup=get_keyboard(message_for_button_sub))
    elif message.text == message_for_button_sub:
        subscribe_or_unsubscribe_user.delay(message.from_user.id, True)
        bot.send_message(message.chat.id, text=message_for_sub, reply_markup=get_keyboard(message_for_button_unsub))


bot.infinity_polling()
