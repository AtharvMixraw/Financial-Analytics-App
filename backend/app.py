from flask import Flask
from flask_cors import CORS
from routes.upload_routes import upload_bp  # Import upload routes

app = Flask(__name__)
CORS(app)

# Register Blueprint
app.register_blueprint(upload_bp, url_prefix="/api")

@app.route("/")
def home():
    return {"message": "Backend is running!"}

if __name__ == "__main__":
    app.run(debug=True)
