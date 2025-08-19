import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2025-07-30",
    totalOrders: 12,
    blocked: false,
    role: "user",
    orders: [
      { id: 101, date: "2025-07-31", status: "Completed", amount: 120000 },
      { id: 102, date: "2025-07-30", status: "Pending", amount: 50000 },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    joinDate: "2025-07-28",
    totalOrders: 5,
    blocked: false,
    role: "admin",
    orders: [
      { id: 103, date: "2025-07-29", status: "Completed", amount: 200000 },
    ],
  },
  // ...existing dummy users...
];

const AdminUserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(dummyUsers.find((u) => u.id === Number(id)));

  if (!user) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">User not found</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  const handleRoleChange = (e) => {
    setUser((prev) => ({ ...prev, role: e.target.value }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Detail</h1>
      <div className="bg-white rounded shadow p-6 mb-6">
        <div className="mb-2"><span className="font-semibold">Name:</span> {user.name}</div>
        <div className="mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
        <div className="mb-2"><span className="font-semibold">Join Date:</span> {user.joinDate}</div>
        <div className="mb-2 flex items-center">
          <span className="font-semibold mr-2">Role:</span>
          <select
            value={user.role}
            onChange={handleRoleChange}
            className="border rounded px-2 py-1"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-2"><span className="font-semibold">Status:</span> {user.blocked ? <span className="text-red-500">Blocked</span> : <span className="text-green-500">Active</span>}</div>
      </div>
      <h2 className="text-lg font-bold mb-2">Order History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {user.orders && user.orders.length > 0 ? (
              user.orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.date}</td>
                  <td className="py-2 px-4">{order.status}</td>
                  <td className="py-2 px-4">Rp{order.amount.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="py-2 px-4 text-center text-gray-500">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate(-1)}>
        Back to Users
      </button>
    </div>
  );
};

export default AdminUserDetail;
