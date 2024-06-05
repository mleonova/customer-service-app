"""
Configuration

This module defines the configuration settings for the application.

Attributes:
    SECRET_KEY: A secret key used for cryptographic functions.
    SQLALCHEMY_DATABASE_URI: The URI for connecting to the database.
    SESSION_TYPE: The type of session storage to be used.
    CORS_HEADERS: The headers to be used for Cross-Origin Resource Sharing (CORS).
"""

import os

class Config:
    SECRET_KEY = os.urandom(24)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://mleonova:csa1234@localhost:5432/customer_service_db'
    SESSION_TYPE = 'filesystem'
    CORS_HEADERS = 'Content-Type'