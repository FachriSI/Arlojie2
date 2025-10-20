import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="p-8 text-center">Memuat data dashboard...</div>;
  if (!data) return <div className="p-8 text-center text-red-500">Gagal memuat data</div>;

  const { summary, recentUsers, lowStock, recentOrders } = data;

    const statusColor = {
    Pending: "bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm",
    Packed: "bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm",
    Shipped: "bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm",
    Delivered: "bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm",
    Cancelled: "bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm",
  };

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans']">
      {/* Judul */}
      <h1 className="text-3xl font-bold mt-8 mb-4">Dashboard</h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Order", value: summary.totalOrder },
          { title: "Total Produk", value: summary.totalProduct },
          { title: "Total User", value: summary.totalUser },
          { title: "Total Revenue", value: `Rp${Number(summary.totalRevenue).toLocaleString("id-ID")}` },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow border text-center">
            <p className="text-gray-500">{item.title}</p>
            <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Aktivitas Terkini */}
      <h2 className="text-xl font-semibold mt-10">Aktivitas Terkini</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Registration */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="font-semibold text-lg mb-3">User Registration</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Nama</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{new Date(user.createdAt).toLocaleDateString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end w-full mt-4">
            <button
              className="flex items-center gap-2 text-gray-700 font-medium hover:underline"
              onClick={() => navigate("/admin/users")}
            >
              Manage User →
            </button>
          </div>
        </div>

        {/* Stok Produk Tersisa */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="font-semibold text-lg mb-3">Stok Produk Tersisa</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Produk</th>
                <th className="p-2 text-left">Stok</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 text-red-500">{item.stock} tersisa</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end w-full mt-4">
            <button
              className="flex items-center gap-2 text-gray-700 font-medium hover:underline"
              onClick={() => navigate("/admin/products")}
            >
              Tambah Produk →
            </button>
          </div>
        </div>
      </div>

      {/* Order Terbaru */}
      <div className="bg-white p-6 rounded-xl shadow border mt-6">
        <h3 className="font-semibold text-lg mb-3">Order Terbaru</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Nama</th>
              <th className="p-2 text-left">Tanggal</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">#{order.id}</td>
                <td className="p-2">{order.namaLengkap}</td>
                <td className="p-2">{new Date(order.orderDate).toLocaleDateString("id-ID")}</td>
                <td className="p-2">Rp{Number(order.totalPrice).toLocaleString("id-ID")}</td>
                <td className="p-2">
                  <span className={statusColor[order.status] || "bg-gray-100 px-3 py-1 rounded-full"}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end w-full mt-4">
          <button
            className="flex items-center gap-2 text-gray-700 font-medium hover:underline"
            onClick={() => navigate("/admin/orders")}
          >
            Lihat Semua Order →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
