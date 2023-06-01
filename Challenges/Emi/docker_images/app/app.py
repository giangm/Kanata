from flask import Flask, redirect, url_for, request, render_template_string
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from forms import LoginForm, RegisterForm

app = Flask(__name__)
app.secret_key = 'super-secret-key'
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin):
    def __init__(self, username, password):
        self.username = username
        self.password = password

    @property
    def id(self):
        return self.username

users = [
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
    return render_template_string("<h1>Hello, " + current_user.username + "!</h1>")

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

    return render_template_string(
        """
        <h1>Login Now!</h1>
        <form method="POST">
            {{ form.hidden_tag() }}
            <p>
                {{ form.username.label }}<br>
                {{ form.username(size=20) }}
            </p>
            <p>
                {{ form.password.label }}<br>
                {{ form.password(size=20) }}
            </p>
            <p>
                {{ form.submit() }}
            </p>
        </form>""", form=form
    )

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
        
    return render_template_string(
        """
        <h1>Register Now!</h1>
        <form method="POST">
            {{ form.hidden_tag() }}
            <p>
                {{ form.username.label }}<br>
                {{ form.username(size=20) }}
            </p>
            <p>
                {{ form.password.label }}<br>
                {{ form.password(size=20) }}
            </p>
            <p>
                {{ form.submit() }}
            </p>
        </form>
        """, form=form
    )


if __name__ == "__main__":
    app.run(debug=True, port=5000)