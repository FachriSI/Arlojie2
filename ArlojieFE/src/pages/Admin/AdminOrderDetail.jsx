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
      {/* ...existing order detail content... */}
    </div>
  );
};

export default AdminOrderDetail;
