import React from "react";
import Watch1 from "../../assets/Home/jam1.svg";

const summary = [
  { title: "Total Penjualan Hari Ini", value: "Rp7.500.000", subtitle: "Diperbarui 10 menit lalu" },
  { title: "Total Penjualan Bulan Ini", value: "Rp26.450.000", subtitle: "Diperbarui 10 menit lalu" },
  { title: "Order Pending", value: "12 Order", subtitle: "" },
];

const chartData = [
  { bulan: "Jan", total: 10 },
  { bulan: "Feb", total: 8 },
  { bulan: "Mar", total: 15 },
  { bulan: "Apr", total: 35 },
  { bulan: "May", total: 20 },
];

const topProducts = [
  { foto: Watch1, nama: "SKMEI Pinkish", kategori: "Jam Tangan Pria", terjual: "500x Terjual" },
  { foto: Watch1, nama: "SKMEI Pinkish", kategori: "Jam Tangan Anak Anak", terjual: "450x Terjual" },
  { foto: Watch1, nama: "SKMEI Pinkish", kategori: "Jam Tangan Wanita", terjual: "300x Terjual" },
  { foto: Watch1, nama: "SKMEI Pinkish", kategori: "Jam Tangan Pria", terjual: "205x Terjual" },
  { foto: Watch1, nama: "SKMEI Pinkish", kategori: "Jam Tangan Wanita", terjual: "100x Terjual" },
];

const AdminAnalytics = () => (
  <div className="min-h-screen bg-[#F4F4F4] py-8 px-4">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8" style={{fontSize:32}}>Analytics</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {summary.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 border flex flex-col justify-center items-center">
            <div className="text-lg font-semibold mb-2">{item.title}</div>
            <div className="text-2xl font-bold mb-1">{item.value}</div>
            <div className="text-sm text-gray-500">{item.subtitle}</div>
          </div>
        ))}
      </div>
      {/* Chart Penjualan Bulanan (dummy bar chart) */}
      <div className="bg-white rounded-xl shadow p-8 border mb-8">
        <div className="font-semibold mb-4">Total Penjualan per Bulan</div>
        <div className="flex items-end h-48 gap-6">
          {chartData.map((data, idx) => (
            <div key={idx} className="flex flex-col items-center justify-end h-full">
              <div className="bg-[#31250B] w-12" style={{height: `${data.total * 4}px`}}></div>
              <div className="mt-2 text-sm">{data.bulan}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Top Selling Produk Table */}
      <div className="bg-white rounded-xl shadow p-8 border">
        <div className="font-semibold mb-4">Top Selling Produk</div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FOTO</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAMA PRODUK</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KATEGORI</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL TERJUAL</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topProducts.map((prod, idx) => (
              <tr key={idx}>
                <td className="px-4 py-4"><img src={prod.foto} alt={prod.nama} className="w-12 h-12 object-contain" /></td>
                <td className="px-4 py-4">{prod.nama}</td>
                <td className="px-4 py-4">{prod.kategori}</td>
                <td className="px-4 py-4">{prod.terjual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AdminAnalytics;
