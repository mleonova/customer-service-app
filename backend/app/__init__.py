'''
This is where Flask application is initialized.
Necessary extensions are imported
'''
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .config import Config

serviceapp = Flask(__name__)
serviceapp.config.from_object(Config)
db = SQLAlchemy(serviceapp)
migrate = Migrate(serviceapp, db)

from app import routes
from app.models import Agent, Customer, Interaction