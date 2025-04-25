import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from data_processing.process_csv import process_csv
from data_processing.process_csv import validate_csv

last_uploaded_file = None

upload_bp = Blueprint("upload", __name__)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"csv"}

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    """Check if the file has a .csv extension"""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route("/upload", methods=["POST"])
def upload_file():
    global last_uploaded_file
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        last_uploaded_file = filename
         # Validate CSV after saving
        validation_result, status_code = validate_csv(filename)
        return jsonify(validation_result), status_code
    else:
        return jsonify({"error": "Invalid file type. Only CSVs are allowed."}), 400

@upload_bp.route("/data", methods=["GET"])
def get_data():
    global last_uploaded_file

    if last_uploaded_file is None:
        return jsonify({"error": "No data available"}), 400

    data, status_code = process_csv(last_uploaded_file)
    return jsonify(data), status_code