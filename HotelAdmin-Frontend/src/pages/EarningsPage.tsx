import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';

interface EarningRecord {
  id: string;
  date: string;
  bookingId: string;
  guestName: string;
  amount: number;
  status: 'pending' | 'completed';
}

const EarningsPage: React.FC = () => {
  const [earnings] = useState<EarningRecord[]>([
    { id: '1', date: '2025-03-27', bookingId: 'BK001', guestName: 'Alice Johnson', amount: 300, status: 'completed' },
    { id: '2', date: '2025-03-26', bookingId: 'BK002', guestName: 'Bob Wilson', amount: 450, status: 'completed' },
    { id: '3', date: '2025-03-25', bookingId: 'BK003', guestName: 'Carol Davis', amount: 200, status: 'pending' },
    { id: '4', date: '2025-03-24', bookingId: 'BK004', guestName: 'David Lee', amount: 500, status: 'completed' },
  ]);

  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
  const completedEarnings = earnings.filter((e) => e.status === 'completed').reduce((sum, e) => sum + e.amount, 0);
  const pendingEarnings = earnings.filter((e) => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);

  return (
    <Layout title="Earnings">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card hover>
            <p className="text-slate-400 text-sm">Total Earnings</p>
            <p className="text-3xl font-bold text-green-400 mt-2">${totalEarnings}</p>
          </Card>
          <Card hover>
            <p className="text-slate-400 text-sm">Completed</p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">${completedEarnings}</p>
          </Card>
          <Card hover>
            <p className="text-slate-400 text-sm">Pending</p>
            <p className="text-3xl font-bold text-amber-400 mt-2">${pendingEarnings}</p>
          </Card>
        </div>

        <Card>
          <h2 className="text-lg font-semibold text-white mb-4">Earnings Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700 dark:bg-slate-800">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Booking ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Guest</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((earning) => (
                  <tr key={earning.id} className="border-b border-slate-700 hover:bg-slate-800 transition">
                    <td className="px-6 py-4 text-slate-300">{earning.date}</td>
                    <td className="px-6 py-4 text-white font-mono font-semibold">{earning.bookingId}</td>
                    <td className="px-6 py-4 text-white">{earning.guestName}</td>
                    <td className="px-6 py-4 text-green-400 font-semibold">${earning.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          earning.status === 'completed'
                            ? 'bg-green-900 text-green-200'
                            : 'bg-yellow-900 text-yellow-200'
                        }`}
                      >
                        {earning.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default EarningsPage;
