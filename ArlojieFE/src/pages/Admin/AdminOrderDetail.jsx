import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyOrders = [
  {
    id: 1001,
    customer: {
      name: "John Doe",
      email: "john@example.com",
      address: "Jl. Mawar No. 1, Jakarta",
    },
    date: "2025-08-01",
    status: "Pending",
    total: 120000,
    items: [
      { name: "Product A", qty: 2, price: 50000 },
      { name: "Product B", qty: 1, price: 20000 },
    ],
  },
  {
    id: 1002,
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      address: "Jl. Melati No. 2, Bandung",
    },
    date: "2025-08-01",
    status: "Completed",
    total: 200000,
    items: [
      { name: "Product C", qty: 4, price: 50000 },
    ],
  },
  // ...existing dummy orders...
];

const statusOptions = ["Pending", "Completed", "Cancelled"];

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = dummyOrders.find((o) => o.id === Number(id));

  const handleStatusChange = (e) => {
    // TODO: Integrasi dengan backend
    alert(`Status updated to ${e.target.value}`);
  };

  const handlePrint = (type) => {
    alert(`Print ${type}`);
    // window.print(); // Untuk print asli
  };

  if (!order) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Order not found</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Order Detail</h1>
      <div className="bg-white rounded shadow p-6 mb-6">
        <div className="mb-2"><span className="font-semibold">Order ID:</span> {order.id}</div>
        <div className="mb-2"><span className="font-semibold">Date:</span> {order.date}</div>
        <div className="mb-2 flex items-center">
          <span className="font-semibold mr-2">Status:</span>
          <select
            defaultValue={order.status}
            onChange={handleStatusChange}
            className="border rounded px-2 py-1"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="mb-2"><span className="font-semibold">Total:</span> Rp{order.total.toLocaleString()}</div>
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-lg font-bold mb-2">Customer Info</h2>
        <div className="mb-2"><span className="font-semibold">Name:</span> {order.customer.name}</div>
        <div className="mb-2"><span className="font-semibold">Email:</span> {order.customer.email}</div>
        <div className="mb-2"><span className="font-semibold">Address:</span> {order.customer.address}</div>
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-lg font-bold mb-2">Order Items</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Qty</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.qty}</td>
                <td className="py-2 px-4">Rp{item.price.toLocaleString()}</td>
                <td className="py-2 px-4">Rp{(item.qty * item.price).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 mt-6">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => handlePrint('Invoice')}>
          Print Invoice
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => handlePrint('Shipping Label')}>
          Print Shipping Label
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate(-1)}>
          Back to Orders
        </button>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
