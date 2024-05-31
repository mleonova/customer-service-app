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
        agent_dict = {'id': agent.id, 'email': agent.email, 'first_name': agent.first_name, 'last_name': agent.last_name}
        agent_list.append(agent_dict)
    
    return jsonify(agent_list)


# endpoint to get a certain agent
@agent_bp.route('/<id>', methods=['GET'])
def get_agent(id):
    agent = Agent.query.get(id)

    if agent:
        agent_data = {'id': agent.id, 'email': agent.email, 'first_name': agent.first_name, 'last_name': agent.last_name}
        return jsonify(agent_data)
    else:
        return jsonify({'message': 'Agent not found'}), 404


# endpoint to add a new agent
@agent_bp.route('/register', methods=['POST'])
def add_agent():
    agent = request.json
    new_agent = Agent(email=agent['email'], first_name=agent['firstName'], last_name=agent['lastName'])
    new_agent.set_password(agent['password'])
    db.session.add(new_agent)
    db.session.commit()
    return jsonify({'message': 'Agent created successfully'}), 201


# endpoint to update an agent
@agent_bp.route('/update/<id>', methods=['PUT'])
def update_agent(id):
    agent = Agent.query.get(id)

    if agent:
        data = request.json
        agent.email = data.get('email', agent.email)
        agent.first_name = data.get('first_name', agent.first_name)
        agent.last_name = data.get('last_name', agent.last_name)
        if 'password' in data:
            agent.set_password(data['password'])
        db.session.commit()
        return jsonify({'message': 'Agent updated successfully'}), 200
    else:
        return jsonify({'message': 'Agent not found'}), 404


# endpoint to delete an agent
@agent_bp.route('/delete/<id>', methods=['DELETE'])
def delete_agent(id):
    agent = Agent.query.get(id)

    if agent:
        db.session.delete(agent)
        db.session.commit()
        return jsonify({'message': 'Agent deleted successfully'}), 204
    else:
        return jsonify({'message': 'Agent not found'}), 404
