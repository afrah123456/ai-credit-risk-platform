# 💰 AI-Driven Credit Risk Platform


A full-stack machine learning system that helps financial institutions assess credit risk and predict loan defaults in real time.

🌐 **Live Demo:** [credit-risk-mlops.vercel.app](https://credit-risk-mlops.vercel.app)  
⚙️ **API Docs:** [ai-credit-risk-platform-production.up.railway.app/docs](https://ai-credit-risk-platform-production.up.railway.app/docs)

---

## 🎯 What It Does

Users can input a customer's financial data and instantly receive:
- A **risk level** (Low / Medium / High)
- A **default probability score**
- A **verdict** and **recommendation** for loan officers

This helps financial institutions make faster, data-driven lending decisions while reducing default rates.

---

## 🚀 Features

- ✅ Real-time credit risk prediction via REST API
- ✅ Stacking ensemble model (XGBoost + Gradient Boosting + Logistic Regression)
- ✅ SMOTE for handling class imbalance
- ✅ MLflow experiment tracking and model versioning
- ✅ Interactive 3-page frontend (Home, Predict, Dashboard)
- ✅ Prediction history and risk distribution charts
- ✅ Model performance dashboard (Accuracy, ROC-AUC, F1, Precision, Recall)
- ✅ Fully deployed — backend on Railway, frontend on Vercel

---

## 📊 Model Performance

| Metric | Score |
|--------|-------|
| Accuracy | 81.9% |
| ROC-AUC | 0.779 |
| Precision | 65.5% |
| Recall | 38.1% |
| F1 Score | 48.1% |

Trained on **30,000 credit card records** from the UCI Machine Learning Repository.

---

## 🛠️ Tech Stack

**Machine Learning**
- Python, scikit-learn, XGBoost
- SMOTE (imbalanced-learn)
- MLflow (experiment tracking)
- Stacking Ensemble

**Backend**
- FastAPI
- Uvicorn
- Joblib
- Deployed on Railway

**Frontend**
- Next.js 14 (TypeScript)
- Tailwind CSS
- Recharts
- Axios
- Deployed on Vercel



---

## 🔧 Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/predict` | Predict credit risk |

### Example Request
```json
POST /predict
{
  "PAY_0": 2,
  "LIMIT_BAL": 20000,
  "AGE": 24,
  ...
}
```

### Example Response
```json
{
  "prediction": 1,
  "probability": 0.7931,
  "risk_level": "High"
}
```

---

## 👩‍💻 Author

**Afrah Fathima**  
[GitHub](https://github.com/afrah123456)
