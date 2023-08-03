from app import app, db
from flask import render_template, redirect, request, url_for, flash, session
from models import User
import hashlib

@app.route('/')
def index():
    return redirect(url_for('view_bio'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username, password=hashlib.md5(password.encode('utf-8')).hexdigest()).first()

        if user:
            session['user_id'] = user.id
            flash('Login successful!', 'success')
            return redirect(url_for('view_bio'))
        else:
            flash('Invalid credentials. Please try again.', 'error')

    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        bio = request.form['bio']

        user = User(username=username, password=password, bio=bio)
        db.session.add(user)
        db.session.commit()

        flash('Account created successfully! You can now log in.', 'success')
        return redirect(url_for('login'))

    return render_template('register.html')


@app.route('/profile', methods=['GET', 'POST'])
def view_bio():
    user = User.query.get(session['user_id'])

    if not user:
        return "User not found."

    if request.method == 'POST':
        bio = request.form['bio']
        user.bio = bio
        db.session.commit()
        flash('Bio updated successfully!', 'success')

    return render_template('user_bio.html', user=user)