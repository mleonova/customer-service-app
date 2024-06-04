from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config

serviceapp = Flask(__name__)
serviceapp.config.from_object(Config)

db = SQLAlchemy(serviceapp)
migrate = Migrate(serviceapp, db)

CORS(serviceapp, resources={r"/*": {"origins": "http://localhost:3000"}})

from app.routes.main_routes import main_bp
from app.routes.auth_routes import auth_bp
from app.routes.api_routes.agent_routes import agent_bp
from app.routes.api_routes.customer_routes import customer_bp
from app.routes.api_routes.interaction_routes import interaction_bp

serviceapp.register_blueprint(main_bp)
serviceapp.register_blueprint(auth_bp, url_prefix='/auth')
serviceapp.register_blueprint(agent_bp, url_prefix='/api/agent')
serviceapp.register_blueprint(customer_bp, url_prefix='/api/customer')
serviceapp.register_blueprint(interaction_bp, url_prefix='/api/interaction')


import click
from flask.cli import with_appcontext
@click.command('seed-db')
@with_appcontext
def seed_db_command():
    """Seed the database."""
    from seed import seed_data
    seed_data()
    click.echo('Database seeded successfully.')

serviceapp.cli.add_command(seed_db_command)
