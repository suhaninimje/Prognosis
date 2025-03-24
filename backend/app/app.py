from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import os
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_cors import CORS
from pathlib import Path
import sys
import subprocess
import json

app = Flask(__name__)

#CORS(app, origins="http://localhost:5000", methods=["GET", "POST", "OPTIONS"], supports_credentials=True)

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

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({'message': 'This is a protected route accessible only with a valid token'}), 200

@app.route("/ping", methods=["GET", "OPTIONS"])
def ping():
    return jsonify({"message": "pong"})

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        start_epiweek = request.json.get("start_epiweek")
        weeks_ahead = request.json.get("weeks_ahead", 5)
        location = request.json.get("district_code", 530)

        # Running the model locally due to space constraints
        project_folder = "/home/asareen/shared/Prognosis/results/"
        model_path = "/home/asareen/shared/Prognosis/saved_models/lstm_model.pth"

        script_path = Path(__file__).resolve().parent.parent.parent / "code" / "predict_next_weeks.py"
        cmd = [
            sys.executable, str(script_path),
            "--project_folder", project_folder,
            "--load_model_path", model_path,
            "--weeks_ahead", str(weeks_ahead)
        ]
        if location:
             cmd += ["--district_code", str(location)]

        if start_epiweek:
            cmd += ["--start_epiweek", str(start_epiweek)]

        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode != 0:
            return jsonify({"error": "Prediction script failed", "stderr": result.stderr}), 500

        output_file = Path(project_folder) / "next_week_preds.json"
        if not output_file.exists():
            return jsonify({"error": "Prediction output file not found."}), 500

        with open(output_file, 'r') as f:
            data = json.load(f)

        return jsonify(data), 200

    except Exception as ex:
        return jsonify({"error": str(ex)}), 500

if __name__ == '__main__':
    # Create the database if it doesn't exist
    with app.app_context():
        db.create_all()
    
    app.run(debug=True, host='0.0.0.0')
