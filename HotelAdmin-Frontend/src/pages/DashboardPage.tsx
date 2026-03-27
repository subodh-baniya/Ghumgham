import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalBookings: 24,
    totalEarnings: 12500,
    totalRooms: 15,
    occupancyRate: 78,
    activeEmployees: 8,
    pendingReviews: 3,
  });

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Bookings</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalBookings}</p>
            </div>
            <span className="text-4xl opacity-50">▣</span>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Earnings</p>
              <p className="text-3xl font-bold text-green-400 mt-2">${stats.totalEarnings}</p>
            </div>
            <span className="text-4xl opacity-50">◀</span>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Rooms</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">{stats.totalRooms}</p>
            </div>
            <span className="text-4xl opacity-50">▢</span>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Occupancy Rate</p>
              <p className="text-3xl font-bold text-indigo-400 mt-2">{stats.occupancyRate}%</p>
            </div>
            <span className="text-4xl opacity-50">■</span>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active Employees</p>
              <p className="text-3xl font-bold text-yellow-400 mt-2">{stats.activeEmployees}</p>
            </div>
            <span className="text-4xl opacity-50">▲</span>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Pending Reviews</p>
              <p className="text-3xl font-bold text-purple-400 mt-2">{stats.pendingReviews}</p>
            </div>
            <span className="text-4xl opacity-50">✦</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-700 dark:bg-slate-800 rounded">
                <div>
                  <p className="text-white font-medium">Guest {i}</p>
                  <p className="text-slate-400 text-sm">Room {100 + i}</p>
                </div>
                <span className="text-green-400 font-semibold">Confirmed</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Available Rooms</span>
              <span className="text-white font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Maintenance</span>
              <span className="text-white font-medium">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Check-in Today</span>
              <span className="text-white font-medium">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Check-out Today</span>
              <span className="text-white font-medium">4</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPage;
