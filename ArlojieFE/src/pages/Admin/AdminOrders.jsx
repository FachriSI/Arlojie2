import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialOrders = [
  {
    id: "#348053",
    nama: "Akmal",
    tanggal: "11/04/2025",
    total: "Rp4. 545. 000",
    status: "Delivered",
  },
  {
    id: "#943946",
    nama: "Budi",
    tanggal: "12/04/2025",
    total: "Rp4. 545. 000",
    status: "Paid",
  },
  {
    id: "#204769",
    nama: "Siti",
    tanggal: "13/04/2025",
    total: "Rp4. 545. 000",
    status: "Packed",
  },
  {
    id: "#391204",
    nama: "Andi",
    tanggal: "14/04/2025",
    total: "Rp4. 545. 000",
    status: "Pending",
  },
  {
    id: "#230586",
    nama: "Siti",
    tanggal: "13/04/2025",
    total: "Rp4. 545. 000",
    status: "Shipped",
  },
];

const statusColors = {
  Delivered: "bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm",
  Paid: "bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm",
  Packed: "bg-blue-100 text-blue-400 px-3 py-1 rounded-full text-sm",
  Pending: "bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm",
  Shipped: "bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm",
};

const statusFilters = [
  "All",
  "Pending",
  "Paid",
  "Packed",
  "Shipped",
  "Delivered",
];

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

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
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' fill=\'none\' stroke=\'gray\' viewBox=\'0 0 24 24\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\'/%3E%3C/svg%3E')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "12px center",
            }}
          />
        </div>
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
                  NAMA
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TANGGAL
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TOTAL
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
                        navigate(`/admin/orders/detail/${order.id}`)
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
