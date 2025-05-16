'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type ActivityLog = {
  date: string;
  action: string;
  amount: number;
};

export default function WalletPage() {
  const router = useRouter();
  const [name, setName] = useState('User');
  const [credits, setCredits] = useState<number | null>(null);
  const [earnings, setEarnings] = useState<number | null>(null);
  const [activity, setActivity] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('user_id');
      const cachedName = localStorage.getItem('user_name');
      if (!userId) return;

      if (cachedName) setName(cachedName);

      const { data: userData } = await supabase
        .from('users')
        .select('carbon_credits')
        .eq('id', userId)
        .single();

      if (userData) {
        setCredits(userData.carbon_credits);
        setEarnings(userData.carbon_credits * 0.25);
      }

      const { data: logs } = await supabase
        .from('activity_logs')
        .select('date, action, amount')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (logs) setActivity(logs as ActivityLog[]);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Welcome, {name}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Carbon Credits</h2>
          <p className="text-4xl font-bold text-brandBlue mt-2">
            {credits !== null ? `${credits} kg` : '...'}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Earnings Balance</h2>
          <p className="text-4xl font-bold text-brandGreen mt-2">
            {earnings !== null ? `£${earnings.toFixed(2)}` : '...'}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2">Date</th>
              <th>Action</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {activity.length > 0 ? (
              activity.map((log, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2">{log.date}</td>
                  <td>{log.action}</td>
                  <td>{log.amount}</td>
                </tr>
              ))
            ) : (
              <tr className="border-t">
                <td colSpan={3} className="py-4 text-center text-gray-400">
                  No activity yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-yellow-100 text-yellow-800 p-4 rounded">
        Tip: Keep generating to maximize your cashbacks!
      </div>
    </div>
  );
}
