from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import os

app = FastAPI()

# Enable CORS for frontend running separately
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development. Restrict in production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model at startup
model_path = os.path.join(os.path.dirname(__file__), "model", "decision_tree_model.pkl")
model = joblib.load(model_path)


# Define request body structure
class LoanInput(BaseModel):
    #age: float
    #income: float
    #loan_amount: float
    #credit_score: float
    Gender: int
    Married: int
    Dependents: int
    Education: int
    Self_Employed: int
    ApplicantIncome: float
    CoapplicantIncome: float
    LoanAmount: float
    Loan_Amount_Term: float
    Credit_History: float
    Property_Area: int
    # Add more fields if your model uses them

class PredictionResult(BaseModel):
    prediction: str


@app.get("/")
async def root():
    return {"message": "Loan Prediction API is running."}


@app.post("/predict", response_model=PredictionResult)
async def predict(input_data: LoanInput):
    # Convert input to 2D array
    features = np.array([[ input_data.Gender,
        input_data.Married,
        input_data.Dependents,
        input_data.Education,
        input_data.Self_Employed,
        input_data.ApplicantIncome,
        input_data.CoapplicantIncome,
        input_data.LoanAmount,
        input_data.Loan_Amount_Term,
        input_data.Credit_History,
        input_data.Property_Area
        ]])

    # Make prediction
    prediction = model.predict(features)[0]

    # Map prediction to label
    result = "Approved" if prediction == 1 else "Rejected"

    return {"prediction": result}
