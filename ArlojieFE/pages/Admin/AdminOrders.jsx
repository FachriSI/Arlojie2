import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// orders will be loaded from backend
const initialOrders = [];

const statusColors = {
  Delivered: "bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm",
  Packed: "bg-blue-100 text-blue-400 px-3 py-1 rounded-full text-sm",
  Pending: "bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm",
  Shipped: "bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm",
  Cancelled: "bg-red-100 text-white-600 px-3 py-1 rounded-full text-sm",
};

const statusFilters = [
  "All",
  "Pending",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const resp = await axios.get('http://localhost:3000/api/admin/orders', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        // Map backend orders to table shape
        const mapped = resp.data.map(o => {
          const status = (o.status || '').toString();
          const capStatus = status.charAt(0).toUpperCase() + status.slice(1);
          return {
            id: `#${o.id}`,
            rawId: o.id,
            // prefer the shipping/checkout recipient name (namaLengkap) as the customer name
            nama: o.namaLengkap || o.User?.name || o.User?.email || '-',
            tanggal: new Date(o.createdAt || o.orderDate).toLocaleDateString('id-ID'),
            total: Number(o.totalPrice || o.total || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
            status: capStatus,
          };
        });

        setOrders(mapped);
      } catch (err) {
        console.error('Gagal memuat order admin:', err.response?.data || err.message);
        setError('Gagal memuat data pesanan.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders by status and search
  const filteredOrders = orders.filter((order) => {
    const matchStatus = filter === "All" || order.status === filter;
    const matchSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.nama.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans']">
      <h1
        style={{
          color: "var(--secondary, #000)",
          fontFamily: "Plus Jakarta Sans",
          fontSize: "32px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
          margin: "32px 0 0 0",
        }}
      >
        Order Management
      </h1>
      <div className="bg-white py-8 px-8 rounded-lg shadow border mt-8 mx-auto max-w-6xl">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari Order ID atau nama costumer"
            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {loading && <div className="text-sm text-gray-500 mb-4">Memuat pesanan...</div>}
        {error && <div className="text-sm text-red-500 mb-4">{error}</div>}
        {/* Filter Buttons */}
        <div className="flex gap-3 mb-6">
          {statusFilters.map((stat) => (
            <button
              key={stat}
              className={`px-6 py-2 rounded-full border text-base font-medium ${
                filter === stat
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setFilter(stat)}
            >
              {stat}
            </button>
          ))}
        </div>
        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ORDER ID
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NAMA CUSTOMER
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TANGGAL PEMBELIAN
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TOTAL HARGA
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {order.nama}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {order.tanggal}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {order.total}
                  </td>
                  <td className="px-4 py-4">
                    <span className={statusColors[order.status]}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      className="text-black underline text-sm font-medium hover:text-blue-600"
                        onClick={() =>
                          navigate(`/admin/orders/${order.rawId}`)
                        }
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
      <footer className="text-center text-gray-500 text-sm mt-8">
        ©2025 ARLOJIE. All Rights Reserved
      </footer>
    </div>
  );
};

export default AdminOrders;
