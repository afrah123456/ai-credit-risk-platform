'use client'
import Link from 'next/link'
import { Shield, TrendingUp, Users, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-400">💰 CreditRisk AI</h1>
        <div className="flex gap-6">
          <Link href="/predict" className="hover:text-purple-400 transition">Predict</Link>
          <Link href="/dashboard" className="hover:text-purple-400 transition">Dashboard</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-32">
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1 text-purple-400 text-sm mb-6">
          AI-Powered Credit Risk Assessment
        </div>
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
          Predict Loan Default<br />Before It Happens
        </h1>
        <p className="text-gray-400 text-xl mb-10 max-w-2xl">
          Our ML model analyzes 23 financial features to predict credit risk with 81.9% accuracy.
          Make smarter lending decisions instantly.
        </p>
        <div className="flex gap-4">
          <Link href="/predict"
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition">
            Try Prediction <ArrowRight size={18} />
          </Link>
          <Link href="/dashboard"
            className="border border-gray-700 hover:border-purple-500 px-8 py-3 rounded-lg font-semibold transition">
            View Dashboard
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto px-8 pb-20">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <Shield className="mx-auto mb-3 text-purple-400" size={32} />
          <div className="text-3xl font-bold">81.9%</div>
          <div className="text-gray-400 text-sm mt-1">Model Accuracy</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <TrendingUp className="mx-auto mb-3 text-purple-400" size={32} />
          <div className="text-3xl font-bold">0.779</div>
          <div className="text-gray-400 text-sm mt-1">ROC-AUC Score</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <Users className="mx-auto mb-3 text-purple-400" size={32} />
          <div className="text-3xl font-bold">30,000</div>
          <div className="text-gray-400 text-sm mt-1">Records Trained</div>
        </div>
      </div>
    </main>
  )
}