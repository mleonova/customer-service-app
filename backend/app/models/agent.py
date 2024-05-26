from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Mapped
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Agent(Base):
    __tablename__ = "agents"

    id: Mapped[int] = Column(Integer, primary_key=True)
    username: Mapped[str] = Column(String(64), index=True, unique=True, nullable=False)
    password: Mapped[str] = Column(String(256))
    first_name: Mapped[str] = Column(String(120), nullable=False)
    last_name: Mapped[str] = Column(String(120), nullable=False)
    email: Mapped[str] = Column(String(120), index=True, unique=True, nullable=False)
    department: Mapped[str] = Column(String(120))
    role: Mapped[str] = Column(String(120))

    def __repr__(self):
        return f"<Agent(id={self.id}, first_name={self.first_name}, last_name={self.last_name})>"
