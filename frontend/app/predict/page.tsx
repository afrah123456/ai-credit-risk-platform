'use client'
import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

const API_URL = 'https://ai-credit-risk-platform-production.up.railway.app'

export default function Predict() {
  const [form, setForm] = useState({
    PAY_0: 0, PAY_2: 0, PAY_3: 0, PAY_4: 0, PAY_5: 0, PAY_6: 0,
    BILL_AMT1: 0, BILL_AMT2: 0, BILL_AMT3: 0, BILL_AMT4: 0, BILL_AMT5: 0, BILL_AMT6: 0,
    PAY_AMT1: 0, PAY_AMT2: 0, PAY_AMT3: 0, PAY_AMT4: 0, PAY_AMT5: 0, PAY_AMT6: 0,
    LIMIT_BAL: 0, AGE: 0, SEX: 1, EDUCATION: 1, MARRIAGE: 1
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await axios.post(API_URL + '/predict', form)
      setResult(res.data)
      const history = JSON.parse(localStorage.getItem('predictions') || '[]')
      history.unshift({ ...res.data, timestamp: new Date().toLocaleString() })
      localStorage.setItem('predictions', JSON.stringify(history.slice(0, 10)))
    } catch (err) {
      alert('Error connecting to API. Make sure FastAPI is running!')
    }
    setLoading(false)
  }

  const riskColor = result?.risk_level === 'High' ? 'red' :
    result?.risk_level === 'Medium' ? 'yellow' : 'green'

  const fields = [
    { name: 'LIMIT_BAL', label: 'Credit Limit' },
    { name: 'AGE', label: 'Age' },
    { name: 'SEX', label: 'Sex (1=Male, 2=Female)' },
    { name: 'EDUCATION', label: 'Education (1-4)' },
    { name: 'MARRIAGE', label: 'Marriage (1=Married, 2=Single)' },
    { name: 'PAY_0', label: 'Payment Status (Sep)' },
    { name: 'PAY_2', label: 'Payment Status (Aug)' },
    { name: 'PAY_3', label: 'Payment Status (Jul)' },
    { name: 'PAY_4', label: 'Payment Status (Jun)' },
    { name: 'PAY_5', label: 'Payment Status (May)' },
    { name: 'PAY_6', label: 'Payment Status (Apr)' },
    { name: 'BILL_AMT1', label: 'Bill Amount (Sep)' },
    { name: 'BILL_AMT2', label: 'Bill Amount (Aug)' },
    { name: 'BILL_AMT3', label: 'Bill Amount (Jul)' },
    { name: 'BILL_AMT4', label: 'Bill Amount (Jun)' },
    { name: 'BILL_AMT5', label: 'Bill Amount (May)' },
    { name: 'BILL_AMT6', label: 'Bill Amount (Apr)' },
    { name: 'PAY_AMT1', label: 'Payment Amount (Sep)' },
    { name: 'PAY_AMT2', label: 'Payment Amount (Aug)' },
    { name: 'PAY_AMT3', label: 'Payment Amount (Jul)' },
    { name: 'PAY_AMT4', label: 'Payment Amount (Jun)' },
    { name: 'PAY_AMT5', label: 'Payment Amount (May)' },
    { name: 'PAY_AMT6', label: 'Payment Amount (Apr)' },
  ]

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-purple-400">💰 CreditRisk AI</Link>
        <div className="flex gap-6">
          <Link href="/predict" className="text-purple-400">Predict</Link>
          <Link href="/dashboard" className="hover:text-purple-400 transition">Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold mb-2">Risk Prediction</h1>
        <p className="text-gray-400 mb-10">Enter customer financial data to assess credit risk</p>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-purple-400">Customer Data</h2>
            <div className="grid grid-cols-2 gap-4">
              {fields.map(f => (
                <div key={f.name}>
                  <label className="text-gray-400 text-sm">{f.label}</label>
                  <input
                    type="number"
                    name={f.name}
                    value={(form as any)[f.name]}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 mt-1 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 py-3 rounded-lg font-semibold transition">
              {loading ? 'Analyzing...' : 'Predict Risk'}
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-purple-400">Prediction Result</h2>
            {!result ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-600">
                <div className="text-6xl mb-4">🔍</div>
                <p>Fill in the form and click Predict</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className={`border rounded-xl p-6 text-center ${
                  riskColor === 'red' ? 'bg-red-500/10 border-red-500/30' :
                  riskColor === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  'bg-green-500/10 border-green-500/30'}`}>
                  <div className="text-5xl mb-2">
                    {result.risk_level === 'High' ? '🔴' :
                     result.risk_level === 'Medium' ? '🟡' : '🟢'}
                  </div>
                  <div className={`text-3xl font-bold ${
                    riskColor === 'red' ? 'text-red-400' :
                    riskColor === 'yellow' ? 'text-yellow-400' : 'text-green-400'}`}>
                    {result.risk_level} Risk
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Default Probability</span>
                    <span className="font-bold text-white">{(result.probability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        riskColor === 'red' ? 'bg-red-500' :
                        riskColor === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${result.probability * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">Verdict</div>
                  <div className="font-semibold text-lg">
                    {result.prediction === 1 ?
                      '⚠️ Likely to Default — Review carefully' :
                      '✅ Unlikely to Default — Safe to approve'}
                  </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                  <div className="text-purple-400 text-sm mb-1">Recommendation</div>
                  <div className="text-sm text-gray-300">
                    {result.risk_level === 'High' ?
                      'Reject loan application or require additional collateral and guarantors.' :
                      result.risk_level === 'Medium' ?
                      'Consider approving with reduced credit limit and closer monitoring.' :
                      'Approve loan application. Customer shows strong repayment indicators.'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}