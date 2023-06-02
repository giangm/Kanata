from flask import Flask, redirect, url_for, request, render_template_string, flash
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
    return render_template_string("<h1>Hello, {{ name }}!</h1>", name=current_user.username)

@app.route("/admin")
@login_required
def admin():
    if not current_user.is_admin:
        return redirect(url_for("index"))
    
    messages = []
    for user in users:
        messages.extend(user.messages)

    return render_template_string(
        """
        <h1>Admin Dashboard</h1>
        <h2>Here are the messages:</h2>
        <ul>
        {% for message in messages %}
            <li>{{ message[0] }}: {{ message[1]|safe }}</li>
        {% endfor %}
        </ul>
        """, messages=messages
    )

@app.route("/add", methods=["GET", "POST"])
@login_required
def add():
    form = MessageForm()
    if request.method == "POST":
        if form.validate_on_submit():
            m = form.message.data
            current_user.add_message(m)
            return redirect(url_for('messages'))

    return render_template_string(
        """
        <h1>Add a message</h1>
        <form method="POST">
            {{ form.hidden_tag() }}
            <p>{{ form.message.label }}<br>{{ form.message(size=30) }}</p>
            <p>{{ form.submit() }}</p>
        </form>
        """, form=form
    )

@app.route("/messages")
@login_required
def messages():
    messages = current_user.messages
    return render_template_string(
        """
        <h1>Here are the messages:</h1>
        <ul>
        {% for message in messages %}
            <li>{{ message[0] }}: {{ message[1] }}</li>
        {% endfor %}
        </ul>
        """, messages=messages
    )

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