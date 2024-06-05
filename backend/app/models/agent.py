"""
Agent Model

This module defines the Agent model, representing agents in the system. 
An agent is a user who interacts with the system.

Attributes:
    id (int): The unique identifier for the agent.
    email (str): The email address of the agent.
    hashed_password (str): The hashed password of the agent.
    first_name (str): The first name of the agent.
    last_name (str): The last name of the agent.
    interactions (relationship): A relationship with the Interaction model.

Functions:
    __repr__(): Returns a string representation of the Agent object.
    set_password(password): Sets the hashed password for the agent.
    check_password(password): Checks if the provided password matches the agent's hashed password.

"""

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app import db
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

class Agent(db.Model):
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(120), index=True, unique=True, nullable=False)
    hashed_password = Column(String(128), nullable=False)
    first_name = Column(String(120), nullable=False)
    last_name = Column(String(120), nullable=False)

    interactions = relationship("Interaction", back_populates="agent")

    def __repr__(self):
        return f"<Agent(id={self.id}, first_name={self.first_name}, last_name={self.last_name})>"

    def set_password(self, password):
        self.hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.hashed_password, password)
