"""
Interaction Model

This module defines the Interaction model, representing interactions between agents and customers in the system.

Attributes:
    id (int): The unique identifier for the interaction.
    agent_id (int): The ID of the agent involved in the interaction.
    customer_id (int): The ID of the customer involved in the interaction.
    created_at (DateTime): The timestamp indicating when the interaction was created.
    type (str): The type of interaction.
    content (str): The content of the interaction.

Relationships:
    agent (relationship): A relationship with the Agent model.
    customer (relationship): A relationship with the Customer model.

Functions:
    __repr__(): Returns a string representation of the Interaction object.
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, relationship
from app import db
import datetime


class Interaction(db.Model):
    __tablename__ = "interactions"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    agent_id: Mapped[int] = Column(Integer, ForeignKey('agents.id'), nullable=False)
    customer_id: Mapped[int] = Column(Integer, ForeignKey('customers.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    type: Mapped[str] = Column(String(64))
    content: Mapped[str] = Column(String, nullable=False)

    agent = relationship("Agent", back_populates="interactions")
    customer = relationship("Customer", back_populates="interactions")

    def __repr__(self):
        return f"<Interaction(id={self.id}, content={self.content})>"

