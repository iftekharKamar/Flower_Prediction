import cv2
import numpy as np

def process_image(image_file):
    # Read image bytes from Flask file object
    file_bytes = np.frombuffer(image_file.read(), np.uint8)

    # Decode image from memory
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    if img is None:
        raise ValueError("Image decoding failed. Invalid image format.")

    # Resize image to required size
    img = cv2.resize(img, (180, 180))

    # Normalize
    img = img / 255.0

    # Add batch dimension
    img = np.expand_dims(img, axis=0)

    return img
