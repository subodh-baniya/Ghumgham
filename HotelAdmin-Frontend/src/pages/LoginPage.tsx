import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import api from '../services/api';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/users/login', {
        email,
        password,
      });

      if (response.data?.data) {
        const userData = response.data.data;
        const { token } = userData;

        if (userData.role === 'hotelAdmin') {
          login(userData, token);
          navigate('/dashboard');
        } else {
          setError('Access denied: Hotel Admin access required');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <img src="/Logo.png" alt="Travallee Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
            <h1 className="text-4xl font-bold font-playfair text-slate-900 mb-2">Hotel Admin</h1>
            <p className="text-slate-500 text-sm tracking-wide">Travallee Property Management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="admin@hotel.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </p>
            )}
            <Button type="submit" fullWidth variant="primary" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Not a hotel admin? Contact super admin
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
