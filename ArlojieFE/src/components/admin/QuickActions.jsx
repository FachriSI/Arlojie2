import React, { useEffect, useState } from "react";

const sampleOrders = [
  { id: "#348613", name: "Akmal", date: "11/04/2025", total: "Rp4.545.000", status: "Paid" },
  { id: "#431446", name: "Budi", date: "12/04/2025", total: "Rp4.545.000", status: "Pending" },
  { id: "#420749", name: "Siti", date: "13/04/2025", total: "Rp4.545.000", status: "Shipped" },
  { id: "#321204", name: "Andi", date: "14/04/2025", total: "Rp4.545.000", status: "Delivered" },
  { id: "#235088", name: "Siti", date: "13/04/2025", total: "Rp4.545.000", status: "Packed" },
];

const statusColor = {
  Paid: "bg-blue-100 text-blue-600",
  Pending: "bg-yellow-100 text-yellow-600",
  Shipped: "bg-purple-100 text-purple-600",
  Delivered: "bg-green-100 text-green-600",
  Packed: "bg-sky-100 text-sky-600",
};

export default function QuickActions({ apiUrl }) {
  const [orders, setOrders] = useState(sampleOrders);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Jika diberi apiUrl, fetch data nyata. Jika tidak, pakai dummy.
    if (!apiUrl) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(apiUrl); // contoh: "/api/orders" atau "http://localhost:5000/orders"
        if (!res.ok) throw new Error("Network response not ok");
        const data = await res.json();
        // Pastikan struktur data sesuai (array of orders)
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders:", err);
        // tetap gunakan dummy jika error
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [apiUrl]);

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Order</h3>
        <span className="text-sm text-gray-500">{loading ? "Loading..." : `${orders.length} order`}</span>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-gray-600">
            <th className="py-2">ORDER ID</th>
            <th className="py-2">NAMA</th>
            <th className="py-2">TANGGAL</th>
            <th className="py-2">TOTAL</th>
            <th className="py-2">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={i} className="border-b">
              <td className="py-2">{o.id}</td>
              <td>{o.name}</td>
              <td>{o.date}</td>
              <td>{o.total}</td>
              <td>
                <span className={`px-2 py-1 rounded-full text-xs ${statusColor[o.status] ?? "bg-gray-100 text-gray-700"}`}>
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-3 text-sm text-blue-500 cursor-pointer">Lihat semua order →</div>
    </div>
  );
}
