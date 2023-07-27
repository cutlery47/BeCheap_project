from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import unidecode
import time


class Parser:

    def __init__(self, url):
        self.url = url
        self.prices = []
        self.soup = None

        # ===================Parser Options====================
        options = Options()
        options.add_argument("--disable-infobars")
        options.add_argument("disable-gpu")
        options.add_argument("no-sandbox")
        options.page_load_strategy = 'eager'
        # ====================================================

        # запускаем браузер с вебдрайвера
        self.driver = webdriver.Chrome(options=options)
        self.driver.get(url)

    def getFullPage_End(self, amount: int) -> str:
        # переменные чтобы дебагалось легче
        CLOTHES_PER_PAGE = 120
        height = 0
        scroll_frequency = 0.3
        scroll_speed = 500

        # xml path кнопки перехода на другую страницу
        LOAD_BUTTON_XPATH = '//*[@id="app-container"]/div[3]/div/div/div[2]/div[5]/a'

        # суть в том, что мы проскролливаем всю страницу полностью
        # затем исходный код страницы передаем парсеру, и он вытаскивает всю инфу
        for i in range(amount):
            # детектим кнопку
            button = self.driver.find_element(By.XPATH, LOAD_BUTTON_XPATH)

            # скроллим вниз до кнопки
            while height < button.location['y']:
                height += scroll_speed
                self.driver.execute_script('window.scrollTo(0, arguments[0])', height)
                time.sleep(scroll_frequency)

            # эта хуета нужна чтобы он не возвращал лишнюю страницу
            if i != (amount - 1):
                button.click()
                time.sleep(5)
                i += 1

        # СЮДААА
        return self.driver.page_source

    # https://www.endclothing.com/ru/sale?page=1 - ссылка на сайт
    def getPrices_End(self):
        # const
        count = 0
        # объект супа
        self.soup = BeautifulSoup(self.getFullPage_End(1), 'lxml')

        # перемещение по html-дереву (по сути хардкод)
        pointer = self.soup.find(id='app-container').find_next('div', style='opacity:1')
        pointer = pointer.find_next('div').find_next_sibling('div')

        # берем все тэги 'a': это наша одежда
        items = pointer.find_all('a')

        # парсинг информации непосредственно из атрибутов тэга
        for item in items:
            count += 1
            clothing = dict()
            clothing['id'] = count

            pointer = item.find('div')
            pointer = pointer.find_next_sibling('span')

            clothing['name'] = pointer.text
            clothing['type'] = pointer.text.split()[-1]

            pointer = pointer.find_next_sibling('span')
            clothing['color'] = pointer.text

            # иногда попадается одежда без скидки
            # чтобы парсер не падал - скипаем нахуй
            try:
                pointer = pointer.find_next_sibling('div')
                clothing['prev_price'] = pointer.text.split('RUB')[1]
                clothing['new_price'] = pointer.text.split('RUB')[2]
                pointer = pointer.find_next_sibling('span')
                clothing['sale'] = pointer.text
            except (IndexError, AttributeError) as error:
                continue

            clothing['img'] = item.find('div').find('img')['src']

            # СЮДААА
            self.prices.append(clothing)

    # https://rivegauche.ru/category/parfyumeriya-3/muzhskie-aromaty-4?q=:popularity:stockLevelStatus:lowStock:stockLevelStatus:inStock:categoryShowcases:showcases_offer&currentPage=11&categoryCode=Perfumery_Men
    # не работает ----- переделать нахуй
    def getPrices_Rivegauche(self):
        items = self.soup.find('cms-product-listing',
                               class_='d-flex flex-wrap align-self-start p-category__list-products').find('div',
                                                                                                          class_='list')

        for product in items.find_all_next('product-item'):
            prod = {}
            product = product.find_next()
            # добавляю пропаршенные данные
            prod['sale'] = product.text

            product = product.find_next_siblings()[1].find_next()
            prod['name'] = product.text

            product = product.find_next()
            prod['type'] = product.text

            product = product.find_next()
            prod['new_price'] = unidecode.unidecode(product.text.split('₽')[0])
            prod['prev_price'] = unidecode.unidecode(product.text.split('₽')[0])
            self.prices.append(prod)


def get_parse_data():
    parsr = Parser('https://www.endclothing.com/ru/sale?page=1')
    parsr.getPrices_End()
    return parsr.prices