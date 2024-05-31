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

