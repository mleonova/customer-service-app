from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Mapped
from app import db

class Customer(db.Model):
    __tablename__ = "customers"

    id: Mapped[int] = Column(Integer, primary_key=True)
    first_name: Mapped[str] = Column(String(120), nullable=False)
    last_name: Mapped[str] = Column(String(120), nullable=False)
    email: Mapped[str] = Column(String(120), index=True, unique=True, nullable=False)

    def __repr__(self):
        return f"<Customer(id={self.id}, first_name={self.first_name}, last_name={self.last_name})>"

