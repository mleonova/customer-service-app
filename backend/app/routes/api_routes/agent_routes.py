from flask import Blueprint, request, jsonify
from app.models import Agent
from app import db

agent_bp = Blueprint('agent', __name__)

# endpoint to get all agents
@agent_bp.route('/agents', methods=['GET'])
def get_all_agents():
    agents = Agent.query.all()
    
    agent_list = []

    for agent in agents:
        agent_dict = {'id': agent.id, 'email': agent.email, 'password': agent.password, 'first_name': agent.first_name, 'last_name': agent.last_name}
        agent_list.append(agent_dict)
    
    return jsonify(agent_list)


# endpoint to get a certain agent
@agent_bp.route('/<id>', methods=['GET'])
def get_agent(id):
    agent = Agent.query.get(id)

    if agent is None:
        return jsonify({'message': 'Agent not found'}), 404
    
    return jsonify({'id': agent.id, 'email': agent.email, 'password': agent.password, 'first_name': agent.first_name, 'last_name': agent.last_name })


# endpoint to add a new agent
@agent_bp.route('/agents', methods=['POST'])
def add_agent():
    agent = request.json
    new_agent = Agent(email=agent['email'], password=agent['password'], first_name=agent['firstName'], last_name=agent['lastName'])
    db.session.add(new_agent)
    db.session.commit()
    return jsonify({'message': 'Agent created successfully'})


# endpoint to update an agent
@agent_bp.route('/agents/<id>', methods=['PUT'])
def update_agent(id):
    agent = Agent.query.get(id)

    if agent is None:
        return jsonify({'message': 'Agent not found'}), 404

    data = request.json
    agent.email = data.get('email', agent.email)
    agent.password = data.get('password', agent.password)
    agent.first_name = data.get('firstName', agent.first_name)
    agent.last_name = data.get('lastName', agent.last_name)
    db.session.commit()
    return jsonify({'message': 'Agent updated successfully'}), 200


# endpoint to delete an agent
@agent_bp.route('/agents/<id>', methods=['DELETE'])
def delete_agent(id):
    agent = Agent.query.get(id)

    if agent is None:
        return jsonify({'message': 'Agent not found'}), 404

    db.session.delete(agent)
    db.session.commit()
    return jsonify({'message': 'Agent deleted successfully'}), 204
