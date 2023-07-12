from flask import Flask, render_template, abort, send_from_directory, request, send_file
import os

app = Flask(__name__)

cookie_directory = "cookie"  # Replace with the actual path to your cookie images directory


@app.route("/")
def index():
    cookies = [
        {"name": "Chocolate Chip", "price": "$2.99", "file": "chocolatechip.jpg"},
        {"name": "Oatmeal Raisin", "price": "$3.49", "file": "double.jpg"},
        {"name": "Sugar Cookie", "price": "$1.99", "file": "green.jpg"},
    ]
    return render_template("index.html", cookies=cookies)


@app.route("/cookie/display/")
def display_cookie():
    cookie_name = request.args.get("cookie")
    if not cookie_name:
        abort(400)  # Bad Request if no cookie name provided
    namelen = len(cookie_name)-1
    x = 0
    while x < namelen:
        if cookie_name[x] == '.':
            if cookie_name[x+1] =='.':
                if cookie_name[x+2] =='/':
                    cookie_name = cookie_name[:x]+cookie_name[x+3:]    # Construct the path to the cookie image
                    namelen-=2
        x+=1
    print(cookie_name)
    relative_path = "cookie/" + cookie_name
    print(os.getcwd())
    absolute_path = os.path.join(os.getcwd(), relative_path) 
    if os.path.isfile(absolute_path):
        return send_file(absolute_path)
    else:
        return f"No image found for {cookie_name}."


if __name__ == "__main__":
    app.run(debug=True)