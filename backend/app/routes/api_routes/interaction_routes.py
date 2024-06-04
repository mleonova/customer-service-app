from flask import Blueprint, request, jsonify
from app.models import Interaction
from app import db

interaction_bp = Blueprint('interaction', __name__)

# endpoint to get all interactions
@interaction_bp.route('/interactions', methods=['GET'])
def get_all_interactions():
    interactions = Interaction.query.all()
    
    interactions_list = []

    for interaction in interactions:
        interaction_dict = {'id': interaction.id, 'agent_id': interaction.agent_id, 'customer_id': interaction.customer_id, 'created_at': interaction.created_at, 'type': interaction.type, 'content': interaction.content}
        interactions_list.append(interaction_dict)
    
    return jsonify(interactions_list)


# endpoint to get a certain interaction
@interaction_bp.route('/<id>', methods=['GET'])
def get_interaction(id):
    interaction = Interaction.query.get(id)

    if interaction:
        interaction_data = {'id': interaction.id, 'agent_id': interaction.agent_id, 'customer_id': interaction.customer_id, 'created_at': interaction.created_at, 'type': interaction.type, 'content': interaction.content}
        return jsonify(interaction_data)
    else:
        return jsonify({'message': 'Interaction not found'}), 404


# endpoint to add a new interaction
@interaction_bp.route('/register', methods=['POST'])
def add_interaction():
    interaction = request.json
    new_interaction = Interaction(agent_id=interaction['agent_id'], customer_id=interaction['customer_id'], created_at=interaction['created_at'], type=interaction['type'], content=interaction['content'])
    db.session.add(new_interaction)
    db.session.commit()
    return jsonify({'message': 'Interaction created successfully'}), 201


# endpoint to update an interaction
@interaction_bp.route('/update/<id>', methods=['PUT'])
def update_interaction(id):
    interaction = Interaction.query.get(id)

    if interaction:
        data = request.json
        interaction.agent_id = data.get('agent_id', interaction.agent_id)
        interaction.customer_id = data.get('customer_id', interaction.customer_id)
        interaction.created_at = data.get('created_at', interaction.created_at)
        interaction.type = data.get('type', interaction.type)
        interaction.content = data.get('content', interaction.content)
        db.session.commit()
        return jsonify({'message': 'Interaction updated successfully'}), 200
    else:
        return jsonify({'message': 'Interaction not found'}), 404
    


# endpoint to delete an interaction
@interaction_bp.route('/delete/<id>', methods=['DELETE'])
def delete_interaction(id):
    interaction = Interaction.query.get(id)

    if interaction:
        db.session.delete(interaction)
        db.session.commit()
        return jsonify({'message': 'Interaction deleted successfully'}), 204
    else:
        return jsonify({'message': 'Interaction not found'}), 404
