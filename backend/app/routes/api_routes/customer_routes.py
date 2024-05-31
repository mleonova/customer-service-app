from flask import Blueprint, request, jsonify
from app.models import Customer
from app import db

customer_bp = Blueprint('customer', __name__)

# endpoint to get all customers
@customer_bp.route('/customers', methods=['GET'])
def get_all_customers():
    customers = Customer.query.all()
    
    customer_list = []

    for customer in customers:
        customer_dict = {'id': customer.id, 'first_name': customer.first_name, 'last_name': customer.last_name, 'email': customer.email}
        customer_list.append(customer_dict)
    
    return jsonify(customer_list)


# endpoint to get a certain customer
@customer_bp.route('/<id>', methods=['GET'])
def get_customer(id):
    customer = Customer.query.get(id)

    if customer:
        customer_data = {'id': customer.id, 'first_name': customer.first_name, 'last_name': customer.last_name, 'email': customer.email}
        return jsonify(customer_data)
    else:
        return jsonify({'message': 'Customer not found'}), 404
    
    


# endpoint to add a new customer
@customer_bp.route('/register', methods=['POST'])
def add_customer():
    customer = request.json
    new_customer = Customer(first_name=customer['firstName'], last_name=customer['lastName'], email=customer['email'])
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({'message': 'Customer created successfully'}), 201


# endpoint to update a customer
@customer_bp.route('/update/<id>', methods=['PUT'])
def update_customer(id):
    customer = Customer.query.get(id)

    if customer:
        data = request.json
        customer.first_name = data.get('firstName', customer.first_name)
        customer.last_name = data.get('lastName', customer.last_name)
        customer.email = data.get('email', customer.email)
        db.session.commit()
        return jsonify({'message': 'Customer updated successfully'}), 200
    else:
        return jsonify({'message': 'Customer not found'}), 404


# endpoint to delete a customer
@customer_bp.route('/delete/<id>', methods=['DELETE'])
def delete_customer(id):
    customer = Customer.query.get(id)

    if customer:
        db.session.delete(customer)
        db.session.commit()
        return jsonify({'message': 'Customer deleted successfully'}), 204
    else:
        return jsonify({'message': 'Customer not found'}), 404
