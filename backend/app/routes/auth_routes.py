from flask import Blueprint, request, jsonify
from app.models import Agent
from app import db

auth_bp = Blueprint('auth', __name__)

# endpoint for agent login
@auth_bp.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    agent = Agent.query.filter_by(email=email).first()

    if agent and agent.check_password(password):
        return jsonify({'message': 'Login successful', 'agent_id': agent.id}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401