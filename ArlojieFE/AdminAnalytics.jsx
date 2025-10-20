import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/admin/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnalytics(res.data);
      } catch (err) {
        console.error("Gagal memuat data analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="p-8 text-center">Memuat data analytics...</div>;
  if (!analytics) return <div className="p-8 text-center text-red-500">Gagal memuat data</div>;

  const { summary, chartData, topProducts } = analytics;

  return (
    <div className="min-h-screen bg-[#F4F4F4] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Analytics</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border flex flex-col justify-center items-center">
            <div className="text-lg font-semibold mb-2">Total Penjualan Hari Ini</div>
            <div className="text-2xl font-bold mb-1">
              Rp{Number(summary.salesToday || 0).toLocaleString("id-ID")}
            </div>
            <div className="text-sm text-gray-500">Diperbarui 10 menit lalu</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border flex flex-col justify-center items-center">
            <div className="text-lg font-semibold mb-2">Total Penjualan Bulan Ini</div>
            <div className="text-2xl font-bold mb-1">
              Rp{Number(summary.salesThisMonth || 0).toLocaleString("id-ID")}
            </div>
            <div className="text-sm text-gray-500">Diperbarui 10 menit lalu</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border flex flex-col justify-center items-center">
            <div className="text-lg font-semibold mb-2">Order Pending</div>
            <div className="text-2xl font-bold mb-1">{summary.pendingOrders || 0} Order</div>
          </div>
        </div>

        {/* Chart Penjualan Bulanan */}
        <div className="bg-white rounded-xl shadow p-8 border mb-8">
          <div className="font-semibold mb-4">Total Penjualan per Bulan</div>
          <div className="flex items-end h-48 gap-6 overflow-x-auto">
            {chartData.length === 0 ? (
              <div className="text-gray-400 text-sm">Belum ada data penjualan</div>
            ) : (
              chartData.map((data, idx) => (
                <div key={idx} className="flex flex-col items-center justify-end h-full">
                  <div
                    className="bg-[#31250B] w-10 rounded-t"
                    style={{ height: `${data.total / 100000}px` }}
                    title={`Rp${Number(data.total).toLocaleString("id-ID")}`}
                  ></div>
                  <div className="mt-2 text-sm">
                    {new Date(data.bulan + "-01").toLocaleDateString("id-ID", {
                      month: "short",
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Selling Produk */}
        <div className="bg-white rounded-xl shadow p-8 border">
          <div className="font-semibold mb-4">Top Selling Produk</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FOTO
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NAMA PRODUK
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TOTAL TERJUAL
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topProducts.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-400">
                    Belum ada data produk terjual
                  </td>
                </tr>
              ) : (
                topProducts.map((prod, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-4">
                      <img
                        src={prod.foto}
                        alt={prod.nama}
                        className="w-12 h-12 object-contain rounded"
                      />
                    </td>
                    <td className="px-4 py-4">{prod.nama}</td>
                    <td className="px-4 py-4">{prod.terjual}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
