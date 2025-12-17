import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}`;


const predict = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile); // 'file' matches your FastAPI parameter

    const response = await axios.post(`${API_BASE_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Prediction response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error predicting:", error);
  }
};


export default predict;