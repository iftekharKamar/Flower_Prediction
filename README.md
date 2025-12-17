## Flower Species Classifier

A full-stack web application that identifies flower species from uploaded images using a Convolutional Neural Network (CNN). The system features a modern React frontend and a Flask-powered inference engine.

---

# 🚀 Features

* **Image Upload:** Drag-and-drop or select flower images for identification.

* **Real-time Prediction:** Fast inference powered by a custom-trained CNN model.

* **Visual Confidence:** Displays the prediction result with a confidence percentage.

* **Interactive UI:** Modern, responsive interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Lucide Icons

* **Backend:** Flask (Python)

* **Computer Vision:** OpenCV (Image Preprocessing)

* **Deep Learning:** TensorFlow/Keras or PyTorch (CNN Model)
  
*  **API:** RESTful API for communication between React and Flask

 ---
* ## 📂 Project Structure
```├── backend/
│   ├── run.py              # Flask API Entry Point
│   ├── model/              # Saved .h5 or .pth model file
│   └──app/
|      ├──utils
|      ├──route
|      ├──init
|      └──model 
|
├── frontend/
│   ├── src/
│   │   ├── components/# UI Components (Result Card, etc.)
|   |   |      └──ImageUpload
│   │   └── App.js          # Main logic & API calls
│   └── tailwind.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

## 1. Backend Setup (Flask)

```cd backend
# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```
## 2. Frontend Setup (React)

```cd frontend
npm install
npm start
```

---

## 🧠 How it Works
**1.Image Input:** React sends a POST request with the image file to the /predict endpoint.

**2.Preprocessing:** OpenCV resizes the image to the required input size (e.g., 224x224) and normalizes pixel values.

**3.Inference:** The CNN model processes the image and returns a probability distribution.

**4.Response:** The Flask API sends back a JSON response containing the class_name and confidence score.

---
## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


