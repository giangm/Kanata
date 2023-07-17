from flask import Flask, redirect, url_for, request, render_template
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from forms import LoginForm, RegisterForm, MessageForm

app = Flask(__name__)
app.secret_key = 'super-secret-key'
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin):
    def __init__(self, username, password, is_admin=False):
        self.username = username
        self.password = password
        self.is_admin = is_admin
        self.messages = []

    @property
    def id(self):
        return self.username

    def add_message(self, message):
        self.messages.append((self.username, message))

users = [
    User("admin", generate_password_hash("admin"), True),
    User("user1", generate_password_hash("user1")),
    User("user2", generate_password_hash("user2"))
]

@login_manager.user_loader
def load_user(username):
    for user in users:
        if user.username == username:
            return user
    return None

@app.route("/")
@login_required
def index():
    return render_template("index.html", name=current_user.username)

@app.route("/admin")
@login_required
def admin():
    if not current_user.is_admin:
        return redirect(url_for("index"))
    
    messages = []
    for user in users:
        messages.extend(user.messages)

    return render_template("admin.html", messages=messages)

@app.route("/add", methods=["GET", "POST"])
@login_required
def add():
    form = MessageForm()
    if request.method == "POST":    
        if form.validate_on_submit():
            m = form.message.data
            #m = m.upper()
            return render_template("add.html", message=m, form=form)

    return render_template("add.html", message = "", form=form)

@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if request.method == "POST":
        if form.validate_on_submit():
            u = form.username.data
            p = form.password.data

            for user in users:
                if user.username == u and check_password_hash(user.password, p):
                    login_user(user)
                    return redirect(url_for("index"))

    return render_template("login.html", form=form)

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))

@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegisterForm()
    if request.method == "POST":
        if form.validate_on_submit():
            u = form.username.data
            p = form.password.data

            users.append(User(u, generate_password_hash(p)))

            return redirect(url_for("login"))
        
    return render_template("register.html", form=form
    )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)