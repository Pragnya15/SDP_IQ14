# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import pickle
# import re

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Add your frontend's URL here
#     allow_credentials=True,
#     allow_methods=["GET", "POST"],
#     allow_headers=["*"],
# )

# class Review(BaseModel):
#     text: str

# @app.post("/predict")
# async def predict_sentiment(review: Review):
    
#     with open("logistic_regression_model.pkl", "rb") as model_file:
#         model = pickle.load(model_file)
#     with open("count_vectorizer.pkl", "rb") as vectorizer_file:
#         vectorizer = pickle.load(vectorizer_file)

    
#     text = review.text.lower() 
#     text = re.sub(r"[^\w\s]", "", text)  
#     tokens = text.split()
#     features = vectorizer.transform([' '.join(tokens)])  

   
#     prediction = model.predict(features)[0]
#     classification = "Real" if prediction == 1 else "Fake"

#     return {"classification": classification}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=8000)




from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pickle
import re
from pymongo import MongoClient
from pydantic import BaseModel  # Import BaseModel to define the request body schema

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['prediction']
collection = db['reviews']
@app.get("/reviews")
async def get_reviews():
    reviews = list(collection.find({}, {'_id': 0}))  # Exclude _id field from results
    return reviews

# Define request body schema
class Reviews(BaseModel):
    text: str

@app.post("/predict")
async def predict_sentiment(review: Reviews):  # Use the Reviews schema
    # Check if review already exists in the database
    existing_review = collection.find_one({"text": review.text})
    if existing_review:
        return {"classification": existing_review['classification']}
    
    # Load model and vectorizer
    with open("logistic_regression_model.pkl", "rb") as model_file:
        model = pickle.load(model_file)
    with open("count_vectorizer.pkl", "rb") as vectorizer_file:
        vectorizer = pickle.load(vectorizer_file)

    # Preprocess text
    text = review.text.lower() 
    text = re.sub(r"[^\w\s]", "", text)  
    tokens = text.split()
    features = vectorizer.transform([' '.join(tokens)])  

    # Make prediction
    prediction = model.predict(features)[0]
    classification = "Real" if prediction == 1 else "Fake"

    # Save review to MongoDB
    db_result = collection.insert_one({"text": review.text, "classification": classification})
    if db_result.inserted_id:
        return {"classification": classification}
    else:
        raise HTTPException(status_code=500, detail="Failed to save review to database")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
