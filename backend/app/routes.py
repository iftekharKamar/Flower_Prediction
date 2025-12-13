from flask import Blueprint,request,jsonify
from .models import predict_image

main=Blueprint('main',__name__)

@main.route("/",methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file"}), 400

    file = request.files["image"]
    result = predict_image(file)
    
    return jsonify(result)

