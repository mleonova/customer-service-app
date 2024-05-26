from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime


Base = declarative_base()

class Interaction(Base):
    __tablename__ = "interactions"

    id: Mapped[int] = Column(Integer, primary_key=True)
    agent_id: Mapped[int] = Column(Integer, ForeignKey('agents.id'))
    customer_id: Mapped[int] = Column(Integer, ForeignKey('customers.id'))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    type: Mapped[str] = Column(String(64))
    content: Mapped[str] = Column(String, nullable=False)
    notes: Mapped[str] = Column(String)

    agent = relationship("Agent", back_populates="interactions")
    customer = relationship("Customer", back_populates="interactions")

    def __repr__(self):
        return f"<Interaction(id={self.id}, content={self.content})>"

