# Financial Analytics Dashboard

A modern full-stack application for uploading, validating, and visualizing financial data from CSV files. The frontend is built using React with Vite, and the backend is powered by Flask. This application allows users to analyze expense/transaction data through interactive charts.

## Features

### Frontend
- Clean, responsive UI with a modern design
- Interactive drag-and-drop file upload
- Real-time upload progress tracking
- CSV file validation and error handling
- Financial data visualization with Chart.js
- Animated transitions with Framer Motion
- Multi-page navigation using React Router

### Backend
- CSV file upload and validation
- Checks for required columns (Date, Category, Amount)
- Date format validation and missing value detection
- Data processing and JSON conversion for frontend
- CORS support for cross-origin requests

## Prerequisites

Before installing and running the application, ensure you have:
- Node.js 18+ installed (for frontend)
- Python 3.12+ installed (for backend)
- Poetry installed (for managing Python dependencies)

## Installation and Setup

### 1. Download and Extract the Project
- Download the project as a ZIP file from the repository.
- Extract the folder to your desired location.
- Open a terminal and navigate to the correct directory.

### 2. Backend Setup (Flask API)

#### Using Poetry (Recommended)
```bash 
cd backend
poetry install
```

To activate the virtual environment and start the backend:
```bash
poetry shell
python app.py
```

Alternatively, run in a single command:
```bash
poetry run python app.py
```

The Flask API will start at: http://127.0.0.1:5000/

#### Using pip (Alternative)
If you're not using Poetry:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 3. Frontend Setup (React)
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at: http://localhost:5173/

## Usage

### Start the Backend First
- Ensure the Flask API is running at http://127.0.0.1:5000/

### Launch the Frontend
- Open http://localhost:5173/
- Navigate to the upload page
- Drag and drop a CSV file or click to browse
- Once uploaded successfully, the data visualization will update automatically

## CSV File Format
Your CSV files should follow this format:
```
Date,Category,Amount
01/02/2023,Groceries,125.40
15/02/2023,Utilities,85.00
```

- Date: Must be in DD/MM/YYYY format
- Category: Transaction category (text)
- Amount: Transaction amount (number)

## API Endpoints

### 1. GET /
Returns a simple message indicating the backend is running.

### 2. POST /api/upload
Uploads and validates a CSV file.
- Request: Form data with 'file' field containing a CSV file
- Response: JSON with validation result and status code

### 3. GET /api/data
Retrieves processed data from the most recently uploaded CSV file.
- Response: JSON with processed data or error message

## Building for Production

### Frontend
```bash
npm run build
npm run preview
```

### Backend
```bash
poetry run python app.py
```

## Development Commands

| Command                    | Description                             |
|----------------------------|-----------------------------------------|
| `npm run dev`              | Start the frontend development server   |
| `npm run build`            | Build the frontend for production       |
| `npm run preview`          | Preview the production build            |
| `npm run lint`             | Run ESLint for code quality             |
| `poetry install`           | Install backend dependencies            |
| `poetry run python app.py` | Start the Flask backend                 |
| `poetry shell`             | Activate the backend virtual environment|