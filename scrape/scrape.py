## https://github.com/mounicmadiraju/scrape

import requests
from bs4 import BeautifulSoup
import json

cache = {}
def clean(s):
    if s not in cache:
        cache[s] = s.strip().replace("\u00a0\u20ac", "")
    return cache[s]

class Extract_table:
    def __init__(self, page):
        self.Data = {}
        self.Table = page.find("table", {'class':'data_wide_table'})
    def extract(self):
        if not self.Table:
            return None #check if it is in the formate.
        for row in self.Table("tr"):
            if row("th"):
                key = row("th")[0].text.replace("\n", "")
                self.Data[key] = []
            else:
                self.Data[key].append([clean(cell.text) for cell in row("td") if clean(cell.text)])
        return self.Data

class API(object):
    def __init__(self, BASE_URL, Country, city=0):
        self.base = BASE_URL
        self.url = BASE_URL+"country_result.jsp?country="+Country+CURRENCY
        self.country = Country
        self.result = {}
        response = self.get_page(self.url)
        if response:
            self.page = BeautifulSoup(response.text, "html")
            self.get_city()
            EX = Extract_table(self.page)
            self.result[Country] = EX.extract()
            if city:
                self.get_all_city()
        else:
            self.page = None
            self.city = None

    def get_result(self):
        return self.result[self.country]

    def get_page(self, url):
        request = requests.get(url)
        if request.status_code != 200:
            return None
        return request

    def get_city(self):
        self.city_form = self.page.find("form", {"class": "standard_margin"})
        self.city = [values["value"] for values in self.city_form("option")]

    def get_single_city(self, city):
        country = self.country
        city_page = self.base+"/city_result.jsp?country="+country+"&city="+city
        self.city_page = BeautifulSoup(self.get_page(city_page).text, "html")
        table = Extract_table(self.city_page)
        return table.extract()

    def get_all_city(self):
        country = self.country
        self.result[country]["child"] = {}
        for city in self.city:
            print("crawling Country -> %s, city -> %s"%(country, city))
            self.result[country]["child"][city] = self.get_single_city(city)

def write_json(FILE, OBJECT):
    with open(FILE, 'w') as w:
        w.write(json.dumps(OBJECT, indent=3))

CURRENCY = "&displayCurrency=EUR"
URL = "https://www.numbeo.com/cost-of-living/"
COUNTRIES = ["Austria", "Italy", "Belgium", "Latvia", "Bulgaria", "Lithuania", "Croatia", "Luxembourg", "Cyprus", "Malta", "Czech+Republic", "Netherlands", "Denmark", "Poland", "Estonia", "Portugal", "Finland", "Romania", "France", "Slovakia", "Germany", "Slovenia", "Greece", "Spain", "Hungary", "Sweden", "Ireland"]
results = {}

for country in COUNTRIES:
    obj = API(URL, country)
    results[country] = obj.get_result()
write_json("results.json",results)