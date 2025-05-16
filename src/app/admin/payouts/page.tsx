'use client';

export default function AdminPayoutsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Payout Management</h1>
      <table className="w-full bg-white rounded shadow overflow-hidden text-sm">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Method</th>
            <th className="px-4 py-2">Amount Due</th>
            <th className="px-4 py-2">Last Paid</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="px-4 py-2">John Smith</td>
            <td className="px-4 py-2">john@example.com</td>
            <td className="px-4 py-2">Bank</td>
            <td className="px-4 py-2">£60.00</td>
            <td className="px-4 py-2">2025-03-20</td>
            <td className="px-4 py-2">
              <button className="bg-brandBlue text-white px-3 py-1 rounded">Mark Paid</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
