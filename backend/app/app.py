from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import os
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_cors import CORS

CORS(app)
app = Flask(__name__)

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'default_secret_key')

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# User model for storing user info
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    industry = db.Column(db.String(200), nullable=False)
    occupation = db.Column(db.String(200), nullable=False)
    state = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(120), nullable=False)
    district = db.Column(db.String(120), nullable=False)
    pincode = db.Column(db.String(120), nullable=False)

# Sign up endpoint
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    firstname = data.get('firstname')
    lastname = data.get('lastname')
    email = data.get('email')
    password = data.get('password')
    industry = data.get('industry')
    occupation = data.get('occupation')
    state = data.get('state')
    district = data.get('district')
    pincode = data.get('pincode')
    
    if not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    # Check if user already exists
    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({'message': 'User already exists'}), 400
    
    # Hash password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    # Create a new user
    new_user = User(
        firstname=firstname, 
        lastname=lastname, 
        email=email, 
        password=hashed_password,
        industry=industry,
        occupation=occupation,
        state=state,
        district=district,
        pincode=pincode)
    
    # Add user to the database
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully'}), 201

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    # Find user by email
    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        # Create JWT token if credentials are valid
        access_token = create_access_token(identity={'email': user.email})
        return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

# Example protected endpoint that requires JWT token
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({'message': 'This is a protected route accessible only with a valid token'}), 200

if __name__ == '__main__':
    # Create the database if it doesn't exist
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)
