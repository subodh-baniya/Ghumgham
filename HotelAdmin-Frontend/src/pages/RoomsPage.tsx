import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

interface Room {
  id: string;
  roomNumber: string;
  roomType: string;
  capacity: number;
  price: number;
  status: 'available' | 'booked' | 'maintenance';
}

const RoomsPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', roomNumber: '101', roomType: 'Single', capacity: 1, price: 100, status: 'available' },
    { id: '2', roomNumber: '102', roomType: 'Double', capacity: 2, price: 150, status: 'booked' },
    { id: '3', roomNumber: '103', roomType: 'Suite', capacity: 4, price: 250, status: 'available' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'Single',
    capacity: 1,
    price: 0,
  });

  const handleAddRoom = () => {
    const newRoom: Room = {
      id: Date.now().toString(),
      ...formData,
      status: 'available',
    };
    setRooms([...rooms, newRoom]);
    setFormData({ roomNumber: '', roomType: 'Single', capacity: 1, price: 0 });
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'capacity' || name === 'price' ? parseInt(value) : value,
    }));
  };

  return (
    <Layout title="Rooms">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Add New Room
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          title="Add New Room"
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleAddRoom}
          confirmText="Add Room"
        >
          <div className="space-y-4">
            <Input
              label="Room Number"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              placeholder="e.g., 101"
            />
            <Select
              label="Room Type"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              options={[
                { value: 'Single', label: 'Single' },
                { value: 'Double', label: 'Double' },
                { value: 'Suite', label: 'Suite' },
                { value: 'Deluxe', label: 'Deluxe' },
              ]}
            />
            <Input
              label="Capacity"
              name="capacity"
              type="number"
              min="1"
              value={formData.capacity}
              onChange={handleChange}
            />
            <Input
              label="Price per Night"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        </Modal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} hover>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-slate-400 text-sm">Room Number</p>
                  <p className="text-2xl font-bold text-white">{room.roomNumber}</p>
                </div>
                <Badge status={room.status} />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Type:</span>
                  <span className="text-white">{room.roomType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Capacity:</span>
                  <span className="text-white">{room.capacity} guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Price:</span>
                  <span className="text-green-400 font-semibold">${room.price}/night</span>
                </div>
              </div>

              <Button className="mt-4" size="sm" fullWidth variant="secondary">
                Edit Room
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RoomsPage;
