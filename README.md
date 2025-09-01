# Visual Product Matcher
A web application that allows users to find visually similar products by uploading an image or providing an image URL. This project was built as a technical assessment for a Software Engineer position.

# Live Demo
Frontend Application (Vercel): [https://look-up-visual-product-matcher.vercel.app/](https://look-up-visual-product-matcher.vercel.app/)

Backend API (Render): https://lookup-visual-product-matcher.onrender.com

# Application Screenshot
<img width="1366" height="768" alt="Screenshot (457)" src="https://github.com/user-attachments/assets/e031de38-dfba-4d61-87df-38098475986b" />


# Brief Technical Approach
The application is built on a decoupled architecture with a React (Vite) frontend and a Python (FastAPI) backend.

The core of the visual search is powered by a pre-trained machine learning model. Initially, ResNet-50 was considered, but MobileNetV2 was ultimately chosen for its lightweight architecture. This was a key decision to ensure the application could run efficiently within the memory constraints of free-tier cloud hosting platforms like Render.

The process involves an offline script (extract_features.py) that pre-processes a database of product images, converting each into a 1280-dimension feature vector (embedding). When a user provides an image (via file upload or URL), the FastAPI backend generates an embedding for it in real-time. Cosine similarity is then used to compare this new vector against the pre-computed database, identifying the closest matches by score.

The React frontend provides a dynamic user interface for image submission, handling loading/error states, and visualizing the results with a similarity-based filter.

# Features Implemented
✔️ Dual Image Input: Supports both local file upload (with drag & drop) and direct image URL input, including Base64 data URLs.

✔️ Visual Search: Utilizes a MobileNetV2 deep learning model to find visually similar products from a database.

✔️ Similarity Score & Filtering: Each result is returned with a similarity percentage, and users can filter the results in real-time using a minimum similarity slider.

✔️ Mobile-Responsive Design: The UI is fully responsive and provides a seamless experience on devices of all sizes.

✔️ Robust User Experience: Includes clear loading states during API calls and handles potential errors gracefully.

✔️ Live Deployment: The frontend is deployed on Vercel and the backend on Render, demonstrating a full CI/CD workflow.

# Tech Stack
---Frontend---

Framework: React (Vite)

Styling: Tailwind CSS

API Client: Axios

Icons: Lucide React

---Backend---

Framework: FastAPI

ML/Vision: PyTorch, Torchvision

Numerical Computing: NumPy, Scikit-learn

Server: Uvicorn

Deployment:

Frontend: Vercel

Backend: Render

# Project Structure
This project is a monorepo containing two main directories:

/frontend: Contains the React application.

/backend: Contains the FastAPI application, data processing scripts, and the product database.

Running the Project Locally
To run this project on your local machine, follow these steps:

Prerequisites:

Node.js and npm

Python 3.11+ and pip

Git

1. Clone the Repository

`git clone https://github.com/VibhorSharma0053/LookUp_Visual_Product_Matcher.git`

`cd LookUp_Visual_Product_Matcher`

2. Set Up the Backend

# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv env
source env/bin/activate  # On Windows, use `env\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Generate the feature vectors for the database
# This script must be run before starting the server for the first time.
python app/extract_features.py

# Start the FastAPI server
uvicorn app.main:app --reload

The backend will be running at http://1227.0.0.1:8000.

3. Set Up the Frontend

# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm run dev

The frontend will be running at http://localhost:5173. Open this URL in your browser to use the application.
