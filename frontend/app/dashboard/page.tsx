'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function Dashboard() {
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('predictions') || '[]')
    setHistory(saved)
  }, [])

  const modelStats = [
    { name: 'Accuracy', value: 81.9 },
    { name: 'ROC-AUC', value: 77.9 },
    { name: 'Precision', value: 65.5 },
    { name: 'Recall', value: 38.1 },
    { name: 'F1 Score', value: 48.1 },
  ]

  const riskCounts = [
    { name: 'Low', value: history.filter(h => h.risk_level === 'Low').length, color: '#22c55e' },
    { name: 'Medium', value: history.filter(h => h.risk_level === 'Medium').length, color: '#eab308' },
    { name: 'High', value: history.filter(h => h.risk_level === 'High').length, color: '#ef4444' },
  ]

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-purple-400">💰 CreditRisk AI</Link>
        <div className="flex gap-6">
          <Link href="/predict" className="hover:text-purple-400 transition">Predict</Link>
          <Link href="/dashboard" className="text-purple-400">Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400 mb-10">Model performance and prediction history</p>

        {/* Model Stats */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {modelStats.map(s => (
            <div key={s.name} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{s.value}%</div>
              <div className="text-gray-400 text-sm mt-1">{s.name}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Bar Chart */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-purple-400">Model Performance</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={modelStats}>
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6b7280" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }}
                  formatter={(val: any) => [`${val}%`]}
                />
                <Bar dataKey="value" fill="#9333ea" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-purple-400">Risk Distribution</h2>
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-600">
                <div className="text-4xl mb-2">📊</div>
                <p>No predictions yet</p>
                <Link href="/predict" className="text-purple-400 text-sm mt-2 hover:underline">
                  Make your first prediction →
                </Link>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={riskCounts} dataKey="value" nameKey="name"
                    cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                    {riskCounts.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Prediction History */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6 text-purple-400">Prediction History</h2>
          {history.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <div className="text-4xl mb-2">📋</div>
              <p>No predictions yet</p>
              <Link href="/predict" className="text-purple-400 text-sm mt-2 hover:underline block">
                Make your first prediction →
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-800">
                  <th className="text-left pb-3">Time</th>
                  <th className="text-left pb-3">Risk Level</th>
                  <th className="text-left pb-3">Probability</th>
                  <th className="text-left pb-3">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                    <td className="py-3 text-gray-400 text-sm">{h.timestamp}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        h.risk_level === 'High' ? 'bg-red-500/20 text-red-400' :
                        h.risk_level === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'}`}>
                        {h.risk_level}
                      </span>
                    </td>
                    <td className="py-3 font-semibold">{(h.probability * 100).toFixed(1)}%</td>
                    <td className="py-3 text-sm">
                      {h.prediction === 1 ? '⚠️ Likely Default' : '✅ Safe to Approve'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  )
}