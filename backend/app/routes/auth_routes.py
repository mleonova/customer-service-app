"""
Authentication Routes

This module defines routes for handling authentication operations in the system.

Routes:
    - POST /login: Endpoint for agent login.
"""

from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token
from app.models import Agent
from flask_cors import cross_origin


auth_bp = Blueprint('auth', __name__)

# Endpoint for agent login
@auth_bp.route('/login', methods=['OPTIONS', 'POST'])
@cross_origin(origins="http://localhost:3000")
def login():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
        return response
        
    email = request.json.get('email')
    password = request.json.get('password')

    agent = Agent.query.filter_by(email=email).first()

    if agent and agent.check_password(password):
        access_token = create_access_token(identity=agent.id)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401