import os

class Config:
    SECRET_KEY = os.urandom(24)
    SQLALCHEMY_DATABASE_URI = 'postgresql://mleonova:csa1234@localhost:5432/customer_service_db'


