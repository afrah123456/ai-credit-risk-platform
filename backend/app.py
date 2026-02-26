from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

# Load model
model = joblib.load("best_credit_risk_model.pkl")

app = FastAPI(title="Credit Risk API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CustomerData(BaseModel):
    PAY_0: int
    PAY_2: int
    PAY_3: int
    PAY_4: int
    PAY_5: int
    PAY_6: int
    BILL_AMT1: float
    BILL_AMT2: float
    BILL_AMT3: float
    BILL_AMT4: float
    BILL_AMT5: float
    BILL_AMT6: float
    PAY_AMT1: float
    PAY_AMT2: float
    PAY_AMT3: float
    PAY_AMT4: float
    PAY_AMT5: float
    PAY_AMT6: float
    LIMIT_BAL: float
    AGE: int
    SEX: int
    EDUCATION: int
    MARRIAGE: int

@app.get("/")
def home():
    return {"message": "Credit Risk API is running!"}

@app.post("/predict")
def predict(data: CustomerData):
    features = np.array([[
        data.PAY_0, data.PAY_2, data.PAY_3, data.PAY_4, data.PAY_5, data.PAY_6,
        data.BILL_AMT1, data.BILL_AMT2, data.BILL_AMT3, data.BILL_AMT4, data.BILL_AMT5, data.BILL_AMT6,
        data.PAY_AMT1, data.PAY_AMT2, data.PAY_AMT3, data.PAY_AMT4, data.PAY_AMT5, data.PAY_AMT6,
        data.LIMIT_BAL, data.AGE, data.SEX, data.EDUCATION, data.MARRIAGE
    ]])

    prob = model.predict_proba(features)[0][1]
    prediction = int(prob >= 0.5)

    if prob < 0.25:
        risk = "Low"
    elif prob < 0.50:
        risk = "Medium"
    else:
        risk = "High"

    return {
        "prediction": prediction,
        "probability": round(float(prob), 4),
        "risk_level": risk
    }