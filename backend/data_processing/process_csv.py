import os
import pandas as pd

UPLOAD_FOLDER = "uploads"
REQUIRED_COLUMNS = ["Date", "Category", "Amount"]

def validate_csv(filename):
    """Validate CSV structure and check for missing values."""
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    try:
        # Read CSV
        df = pd.read_csv(filepath)

        # Check if required columns exist
        if not all(col in df.columns for col in REQUIRED_COLUMNS):
            return {"error": "Invalid CSV format. Required columns: Date, Category, Amount"}, 400

        df["Date"] = pd.to_datetime(df["Date"], format="%d/%m/%Y", errors="coerce")

        if df["Date"].isnull().sum() > 0:
            return {"error": "Invalid date format detected in CSV"}, 400

        # Check for missing values
        if df.isnull().values.any():
            return {"error": "CSV contains missing values"}, 400

        return {"message": "CSV validation successful", "rows": len(df)}, 200

    except Exception as e:
        return {"error": str(e)}, 500

def process_csv(filename):
    """Process CSV and return structured JSON data"""
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    try:
        df = pd.read_csv(filepath)

        # Ensure proper column names
        if not all(col in df.columns for col in REQUIRED_COLUMNS):
            return {"error": "Invalid CSV format. Required columns: Date, Category, Amount"}, 400

        # Convert Date column to proper format
        df["Date"] = pd.to_datetime(df["Date"], format="%d/%m/%Y", errors="coerce")
        df = df.dropna(subset=["Date"])  # Remove rows with invalid dates
        df["Date"] = df["Date"].dt.strftime("%Y-%m-%d")  # Convert back to string for frontend

        # Convert dataframe to JSON format
        data = df.to_dict(orient="records")

        return {"data": data}, 200

    except Exception as e:
        return {"error": str(e)}, 500