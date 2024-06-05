"""
Main Routes

This module defines routes for the main page of the system.

Routes:
    - GET /: Returns a welcome message.
"""

from flask import Blueprint, jsonify

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return jsonify({'message': 'Welcome to the main page!'})