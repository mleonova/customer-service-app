"""
Customer Model

This module defines the Customer model, representing customers in the system. 

Attributes:
    id (int): The unique identifier for the customer.
    first_name (str): The first name of the customer.
    last_name (str): The last name of the customer.
    email (str): The email address of the customer.
    interactions (relationship): A relationship with the Interaction model.

Functions:
    __repr__(): Returns a string representation of the Customer object.
    
"""

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Mapped, relationship
from app import db

class Customer(db.Model):
    __tablename__ = "customers"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    first_name: Mapped[str] = Column(String(120), nullable=False)
    last_name: Mapped[str] = Column(String(120), nullable=False)
    email: Mapped[str] = Column(String(120), index=True, unique=True, nullable=False)

    interactions = relationship("Interaction", back_populates="customer")

    def __repr__(self):
        return f"<Customer(id={self.id}, first_name={self.first_name}, last_name={self.last_name})>"

