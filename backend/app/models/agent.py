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

    interactions = relationship('Interaction', back_populates='agent')

    def __repr__(self):
        return f"<Agent(id={self.id}, first_name={self.first_name}, last_name={self.last_name})>"

    def set_password(self, password):
        self.hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.hashed_password, password)
