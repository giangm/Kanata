import requests
import random

port = "5000"
url = f"http://localhost:{port}/login"

# List of username and password combinations
credentials = [
    ("user1", "password1"),
    ("user2", "password2"),
    ("user3", "password3"),
    # Add more username and password combinations as needed
]

for _ in range(10):
    # Select a random IP address and credentials for each request
    ip_address = f"{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}"
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
    response = requests.post(url, data, headers=headers)

    # Print the response
    print(f"IP: {ip_address}, Username: {username}, Password: {password}")
    print(response.text)