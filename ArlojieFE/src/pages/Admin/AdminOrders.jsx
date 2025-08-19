import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyOrders = [
  {
    id: 1001,
    customer: "John Doe",
    date: "2025-08-01",
    status: "Pending",
    total: 120000,
  },
  {
    id: 1002,
    customer: "Jane Smith",
    date: "2025-08-01",
    status: "Completed",
    total: 200000,
  },
  {
    id: 1003,
    customer: "Alice Brown",
    date: "2025-07-31",
    status: "Cancelled",
    total: 50000,
  },
  {
    id: 1004,
    customer: "Bob Lee",
    date: "2025-07-30",
    status: "Pending",
    total: 80000,
  },
];

const statusOptions = ["Pending", "Completed", "Cancelled"];

const AdminOrders = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [orders, setOrders] = useState(dummyOrders);
  const navigate = useNavigate();

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = statusFilter
    ? orders.filter((order) => order.status === statusFilter)
    : orders;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="status" className="font-semibold">Filter Status:</label>
        <select
          id="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Customer</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Total</th>
              <th className="py-2 px-4 text-left">Action</th>
              <th className="py-2 px-4 text-left">Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">{order.customer}</td>
                <td className="py-2 px-4">{order.date}</td>
                <td className="py-2 px-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="py-2 px-4">Rp{order.total.toLocaleString()}</td>
                <td className="py-2 px-4">
                  <button
                    className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                    onClick={() => alert('Print Invoice')}
                  >
                    Print Invoice
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
