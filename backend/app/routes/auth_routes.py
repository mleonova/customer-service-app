from flask import Blueprint, jsonify

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/')
def get_data():
    data = {'message': 'Hello from Auth page!'}
    return jsonify(data)