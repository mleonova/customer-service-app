from flask import Blueprint, request, jsonify
from app.models import Agent
from app import db

api_bp = Blueprint('api', __name__)

# endpoint to get all agents
@api_bp.route('/agents', methods=['GET'])
def get_all_agents():
    agents = Agent.query.all()
    return jsonify([{'id': agent.id, 'email': agent.email, 'password': agent.password, 'first_name': agent.first_name, 'last_name': agent.last_name} for agent in agents])


@api_bp.route('/agents/<int:agent_id>', methods=['GET'])
def get_agent(agent_id):
    agent = Agent.query.get(agent_id)
    if agent:
        return jsonify({
            'id': agent.id,
            'email': agent.email,
            'password': agent.password,
            'first_name': agent.first_name,
            'last_name': agent.last_name
        })
    else:
        return jsonify({'error': 'Agent not found'}), 404

# endpoint to create a new agent
@api_bp.route('/agents', methods=['POST'])
def add_agent():
    data = request.json
    new_agent = Agent(email=data['email'], password=data['password'], first_name=data['firstName'], last_name=data['lastName'])
    print(new_agent)
    db.session.add(new_agent)
    db.session.commit()
    return jsonify({'message': 'Agent created successfully'})



# Endpoint to update an agent
# @api_bp.route('/agents/<int:agent_id>', methods=['PUT'])
# def update_agent(agent_id):
#     agent = Agent.query.get_or_404(agent_id)
#     data = request.json
#     agent.email = data.get('email', agent.email)
#     agent.password = data.get('password', agent.password)
#     agent.first_name = data.get('firstName', agent.first_name)
#     agent.last_name = data.get('lastName', agent.last_name)
#     db.session.commit()
#     return jsonify({'message': 'Agent updated successfully'})


@api_bp.route('/agents/<int:agent_id>', methods=['DELETE'])
def delete_agent(agent_id):
    agent = Agent.query.get_or_404(agent_id)
    db.session.delete(agent)
    db.session.commit()
    return jsonify({'message': 'Agent deleted successfully'})
