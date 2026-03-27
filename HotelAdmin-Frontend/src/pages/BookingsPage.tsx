import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

interface Booking {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed';
}

const BookingsPage: React.FC = () => {
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      guestName: 'Alice Johnson',
      roomNumber: '105',
      checkIn: '2025-04-01',
      checkOut: '2025-04-03',
      totalPrice: 300,
      status: 'confirmed',
    },
    {
      id: '2',
      guestName: 'Bob Wilson',
      roomNumber: '102',
      checkIn: '2025-04-02',
      checkOut: '2025-04-05',
      totalPrice: 450,
      status: 'pending',
    },
    {
      id: '3',
      guestName: 'Carol Davis',
      roomNumber: '200',
      checkIn: '2025-03-28',
      checkOut: '2025-03-30',
      totalPrice: 200,
      status: 'completed',
    },
  ]);

  return (
    <Layout title="Bookings">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <p className="text-slate-400 text-sm">Pending Bookings</p>
            <p className="text-3xl font-bold text-yellow-400 mt-2">
              {bookings.filter((b) => b.status === 'pending').length}
            </p>
          </Card>
          <Card>
            <p className="text-slate-400 text-sm">Confirmed Bookings</p>
            <p className="text-3xl font-bold text-green-400 mt-2">
              {bookings.filter((b) => b.status === 'confirmed').length}
            </p>
          </Card>
          <Card>
            <p className="text-slate-400 text-sm">Completed Bookings</p>
            <p className="text-3xl font-bold text-blue-400 mt-2">
              {bookings.filter((b) => b.status === 'completed').length}
            </p>
          </Card>
        </div>

        <Card>
          <h2 className="text-lg font-semibold text-white mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700 dark:bg-slate-800">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Guest</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Room</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Check-in</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Check-out</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-slate-700 hover:bg-slate-800 transition">
                    <td className="px-6 py-4 text-white font-medium">{booking.guestName}</td>
                    <td className="px-6 py-4 text-slate-300">{booking.roomNumber}</td>
                    <td className="px-6 py-4 text-slate-300">{booking.checkIn}</td>
                    <td className="px-6 py-4 text-slate-300">{booking.checkOut}</td>
                    <td className="px-6 py-4 text-green-400 font-semibold">${booking.totalPrice}</td>
                    <td className="px-6 py-4">
                      <Badge status={booking.status} />
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

export default BookingsPage;
