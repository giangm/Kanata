import requests

port = "5123"
url = f"http://localhost:{port}"

query = "http://localhost:8080/admin"

r = requests.post(url + "/fetch", {"url": query})

print(r.text)