from flask import Flask, request, redirect, url_for, flash, get_flashed_messages, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from forms import LoginForm, RegisterForm, CouponForm, ItemsAvailable, CheckoutForm
import random
import string

app = Flask(__name__)
app.config['WTF_CSRF_ENABLED'] = False
app.config['SECRET_KEY'] = 'okpysffvmziijeadmlsw'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

prices = {'apple': 5, 'banana': 10, 'cucumber': 5000}

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    balance = db.Column(db.Float, default=0)
    coupon = db.Column(db.String(50), default='aaaaaaaaaaaaaaaaaaaa')
    cartTotal = db.Column(db.Integer, default=0)
    redeemed = db.Column(db.Boolean, default=False)

@login_manager.user_loader
def load_user(user_id):
    print(user_id)
    return User.query.get(user_id)

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, password=hashed_password, balance=10, coupon=gen_coupon())
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template("register.html", form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user)
            get_flashed_messages()
            flash("Logged in successfully", "success")
            return redirect(url_for('index'))
    return render_template("login.html", form=form)

@app.route('/', methods=["GET", "POST"])
@login_required
def index():
    form = CouponForm()
    if request.method == "POST":
        code = form.coupon.data
        if form.validate_on_submit():
            valid = User.query.filter_by(coupon=code).first()
            redeemed = User.query.filter_by(coupon=code, redeemed=True).first()

            if valid and not redeemed:
                current_user.balance += 10.00
                couponUser = User.query.filter_by(coupon=code).first()
                couponUser.redeemed = True
                db.session.commit()
                flash("Coupon applied", "success")
            else:
                flash("Invalid coupon", "danger")
        return redirect(url_for("index"))
    else:
        coupon = User.query.with_entities(User.coupon).filter_by(username=current_user.username).first()
        return render_template("index.html", form=form, coupon=coupon[0], redeemed=current_user.redeemed, balance=current_user.balance)

def gen_coupon():
    validCoupons = User.query.with_entities(User.coupon).all()
    letters = string.ascii_lowercase
    code = ''.join(random.choice(letters) for i in range(20)) 
    while code in validCoupons:
        code = ''.join(random.choice(letters) for i in range(20)) 
    
    return code

@app.route('/cart', methods=["GET", "POST"])
@login_required
def cart():
    form = ItemsAvailable()
    if request.method == "POST":
        if form.validate_on_submit():
            item = form.item.data.lower()
            amount = int(form.amount.data)
            pricePer = 0
            try:
                pricePer = prices[item]
            except KeyError:
                return redirect(url_for("cart"))
            totalCost = pricePer*amount
            current_user.cartTotal += totalCost
            db.session.commit()
            return redirect(url_for("cart"))

    return render_template("cart.html", form=form, totalCost=current_user.cartTotal)

@app.route('/checkout', methods=["GET", "POST"])
@login_required
def checkout():
    form = CheckoutForm()
    if request.method == "POST":
        cartCost = current_user.cartTotal
        userBalance = current_user.balance

        if userBalance < cartCost:
            flash("You are too poor!", "danger")
        else:
            current_user.balance -= cartCost
            current_user.cartTotal = 0
            db.session.commit()
            flash("Purchase completed!", "success")
            return redirect(url_for("checkout"))
        
    return render_template("checkout.html", form=form, balance=current_user.balance, total=current_user.cartTotal)
    

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        user1 = User(username='test1', password=bcrypt.generate_password_hash('test1').decode('utf-8'), balance=0, coupon=gen_coupon())
        user2 = User(username='test2', password=bcrypt.generate_password_hash('test2').decode('utf-8'), balance=10, coupon=gen_coupon())
        user3 = User(username='test3', password=bcrypt.generate_password_hash('test3').decode('utf-8'), balance=10, coupon=gen_coupon())

        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)

        db.session.commit()

    app.run(host="0.0.0.0", debug=True, port=5000, use_reloader=False)