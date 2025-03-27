from flask import Flask
from app.routes import main  # Ensure routes.py exists

def create_app():
    app = Flask(__name__)
    app.register_blueprint(main)  # Registering the routes
    return app