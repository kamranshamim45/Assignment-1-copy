import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import { getUsers } from '../services/api';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const totalUsers = users.length;
  const activeUsers = users.length; // Assuming all are active
  const reports = 'Monthly Report'; // Placeholder

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">User Management Dashboard</h1>
              <p className="text-gray-600">Manage and view all registered users</p>
            </div>
            <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold">
              Logout
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">👥</div>
            <h3 className="text-xl font-semibold text-gray-800">Total Users</h3>
            <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">✅</div>
            <h3 className="text-xl font-semibold text-gray-800">Active Users</h3>
            <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">📊</div>
            <h3 className="text-xl font-semibold text-gray-800">Reports</h3>
            <p className="text-lg text-gray-600">{reports}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
