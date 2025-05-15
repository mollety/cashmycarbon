'use client';
import { useState } from 'react';
import Layout from '../../components/Layout';

export default function PayoutPage() {
  const [method, setMethod] = useState<'bank' | 'paypal'>('bank');

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Set Up Your Payouts</h1>

      <div className="mb-4 flex justify-center space-x-4">
        <button onClick={() => setMethod('bank')} className={`px-4 py-2 ${method === 'bank' ? 'bg-brandBlue text-white' : 'bg-gray-100'}`}>Bank</button>
        <button onClick={() => setMethod('paypal')} className={`px-4 py-2 ${method === 'paypal' ? 'bg-brandGreen text-white' : 'bg-gray-100'}`}>PayPal</button>
      </div>

      {method === 'bank' ? (
        <div className="space-y-2">
          <input className="w-full border px-3 py-2" placeholder="Account Name" />
          <input className="w-full border px-3 py-2" placeholder="Sort Code" />
          <input className="w-full border px-3 py-2" placeholder="Account Number" />
        </div>
      ) : (
        <input className="w-full border px-3 py-2" placeholder="PayPal Email" />
      )}

      <button className="w-full bg-brandBlue text-white py-2 rounded mt-6">Save Payment Details</button>
      <p className="text-xs text-gray-500 mt-2 text-center">Your data is securely encrypted.</p>
    </div>
  );
}
