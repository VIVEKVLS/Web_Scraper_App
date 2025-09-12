from flask import Flask
from flask_cors import CORS
import os

# Import blueprints
from health import health_bp
from scrape import scrape_bp

app = Flask(__name__)

# CORS setup
frontend_origin = os.getenv("FRONTEND_ORIGIN", "*")
if frontend_origin == "*":
    CORS(app, resources={r"/api/*": {"origins": "*"}})
else:
    CORS(app, resources={r"/api/*": {"origins": frontend_origin}}, supports_credentials=True)

# Register blueprints
app.register_blueprint(health_bp, url_prefix="/api")
app.register_blueprint(scrape_bp, url_prefix="/api")

# For local development only
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
