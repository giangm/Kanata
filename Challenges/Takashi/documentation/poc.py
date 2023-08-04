import requests

port = "5102"
url = f"http://localhost:{port}"

cookies = {"auth": "privileged"}

s = requests.Session()
r = s.get(url, cookies=cookies)

print(r.text)