import random
import string


# функция генерации токена
def create_token(length):
    letters = string.ascii_lowercase
    rand_string = ''.join(random.choice(letters) for i in range(length))
    numbers = '1234567890'
    rand_nums = ''.join(random.choice(numbers) for i in range(6))
    return 'TOKEN' + rand_string + rand_nums
