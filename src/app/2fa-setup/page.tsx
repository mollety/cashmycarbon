'use client';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function TwoFASetup() {
  const [codeSent, setCodeSent] = useState(false);
  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow text-center">
      <h1 className="text-2xl font-bold mb-4">Secure Your Account</h1>
      <input className="w-full border px-3 py-2 mb-4" placeholder="+44..." />
      <button onClick={() => setCodeSent(true)} className="bg-brandGreen text-white px-4 py-2 rounded">
        Send Verification Code
      </button>

      {codeSent && (
        <div className="mt-6 space-y-2">
          <input className="w-full border px-3 py-2" placeholder="Enter 6-digit code" />
          <button className="w-full bg-brandBlue text-white py-2 rounded">Verify & Enable 2FA</button>
        </div>
      )}
      <p className="text-sm text-gray-500 mt-4">This protects your payouts with an extra security layer.</p>
    </div>
  );
}
