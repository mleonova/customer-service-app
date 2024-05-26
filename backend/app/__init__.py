'''
This is where Flask application is initialized.
Necessary extensions are imported
'''
from flask import Flask

# Flask app object
app = Flask(__name__)

from app import routes