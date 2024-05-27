'''
Endpoints of the API
'''

from app import serviceapp, db

@serviceapp.route('/')
@serviceapp.route('/index')
def index():
    return 'Hello, World!'