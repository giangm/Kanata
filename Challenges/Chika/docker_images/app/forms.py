from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField
from wtforms.validators import DataRequired, Length

class LoginForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), Length(min=5, max=20)])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Login")

class RegisterForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), Length(min=5, max=20)])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Register")

class CouponForm(FlaskForm):
    coupon = StringField('Coupon', validators=[DataRequired(), Length(max=20)])
    submit = SubmitField('Submit')

class ItemsAvailable(FlaskForm):
    item = StringField('Item', validators=[DataRequired()])
    amount = StringField('Amount', validators=[DataRequired()])
    submit = SubmitField('Submit')

class CheckoutForm(FlaskForm):
    submit = SubmitField('Checkout')