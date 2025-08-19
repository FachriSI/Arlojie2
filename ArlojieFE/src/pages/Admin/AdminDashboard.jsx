import React from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  { title: "Total Order", value: "120" },
  { title: "Total Produk", value: "120" },
  { title: "Total User", value: "120" },
  { title: "Total Revenue", value: "120" },
];

const orders = [
  { id: "#348053", nama: "Akmal", tanggal: "11/04/2025", total: "Rp4.545.000", status: "Paid" },
  { id: "#943946", nama: "Budi", tanggal: "12/04/2025", total: "Rp4.545.000", status: "Pending" },
  { id: "#204769", nama: "Siti", tanggal: "13/04/2025", total: "Rp4.545.000", status: "Shipped" },
  { id: "#391204", nama: "Andi", tanggal: "14/04/2025", total: "Rp4.545.000", status: "Delivered" },
  { id: "#230586", nama: "Siti", tanggal: "13/04/2025", total: "Rp4.545.000", status: "Packed" },
];

const userRegistrations = [
  { nama: "Akmal", email: "akmal01@gmail.com", tanggal: "11/04/2025" },
  { nama: "Budi", email: "budii@gmail.com", tanggal: "12/04/2025" },
  { nama: "Siti", email: "inisiti@gmail.com", tanggal: "13/04/2025" },
  { nama: "Andi", email: "andi01@gmail.com", tanggal: "14/04/2025" },
  { nama: "Siti", email: "inisiti@gmail.com", tanggal: "13/04/2025" },
];
const stokProduk = [
  { produk: "Longines Master", stok: "4 tersisa" },
  { produk: "SKMEI Pinkish", stok: "3 tersisa" },
  { produk: "Longines Master", stok: "3 tersisa" },
  { produk: "SKMEI Pinkish", stok: "2 tersisa" },
  { produk: "Longines Master", stok: "4 tersisa" },
];

const statusColor = {
  Paid: "bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm",
  Pending: "bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm",
  Shipped: "bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm",
  Delivered: "bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm",
  Packed: "bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm",
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div>
              <p className="text-gray-500">{stat.title}</p>
              <h2 className="text-3xl font-bold">{stat.value}</h2>
            </div>
            <p className="text-green-500 text-sm mt-2">↑ 2,45%</p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <h2 className="text-lg font-bold">Aktivitas Terkini</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Registration Table */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h3 className="font-semibold mb-4">User Registration</h3>
            <table className="w-full border mb-2">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">NAMA</th>
                  <th className="p-2 border">EMAIL</th>
                  <th className="p-2 border">TANGGAL</th>
                </tr>
              </thead>
              <tbody>
                {userRegistrations.map((user, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">{user.nama}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.tanggal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-2">
            <button className="flex items-center gap-2 text-gray-700 font-medium hover:underline" onClick={() => navigate('/admin/users')}>
              Manage User
              <span className="text-xl">&rarr;</span>
            </button>
          </div>
        </div>
        {/* Stok Produk Tersisa Table */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h3 className="font-semibold mb-4">Stok Produk Tersisa</h3>
            <table className="w-full border mb-2">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">PRODUK</th>
                  <th className="p-2 border">STOK</th>
                </tr>
              </thead>
              <tbody>
                {stokProduk.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">{item.produk}</td>
                    <td className={"p-2 border text-red-500"}>{item.stok}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-2">
            <button className="flex items-center gap-2 text-gray-700 font-medium hover:underline" onClick={() => navigate('/admin/products')}>
              Tambah Produk
              <span className="text-xl">&rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Order Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="font-semibold text-xl mb-4">Order</h3>
        <table className="w-full border mb-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ORDER ID</th>
              <th className="p-2 border">NAMA</th>
              <th className="p-2 border">TANGGAL</th>
              <th className="p-2 border">TOTAL</th>
              <th className="p-2 border">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.nama}</td>
                <td className="p-2 border">{order.tanggal}</td>
                <td className="p-2 border">{order.total}</td>
                <td className="p-2 border">
                  <span className={statusColor[order.status] || statusColor["Paid"]}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button className="flex items-center gap-2 text-gray-700 font-medium hover:underline" onClick={() => navigate('/admin/orders')}>
            Lihat semua order
            <span className="text-xl">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
