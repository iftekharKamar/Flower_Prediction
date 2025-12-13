from .utils import  process_image
import numpy as np
from tensorflow.keras.models import load_model


model=load_model("models/flower_classification_model.h5")

flower_list = ['roses','daisy', 'dandelion','sunflowers','tulips']

def predict_image(image):
    processed_image = process_image(image)
    predictions = model.predict(processed_image)
    predicted_class = int(np.argmax(predictions, axis=1)[0])
    prediction = flower_list[predicted_class]

    return {
        "prediction": prediction,
        "confidence": predicted_class
    }
