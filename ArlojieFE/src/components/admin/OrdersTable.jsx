import React from "react";

const orders = [
  { id: "#34963", name: "Akmal", date: "11/04/2025", total: "Rp4.545.000", status: "Paid" },
  { id: "#49146", name: "Budi", date: "12/04/2025", total: "Rp4.545.000", status: "Pending" },
  { id: "#20749", name: "Siti", date: "13/04/2025", total: "Rp4.545.000", status: "Shipped" },
  { id: "#31204", name: "Andi", date: "14/04/2025", total: "Rp4.545.000", status: "Delivered" },
];

const OrdersTable = () => {
  const statusColor = {
    Paid: "bg-blue-100 text-blue-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Shipped: "bg-purple-100 text-purple-600",
    Delivered: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-6">
      <h3 className="font-semibold mb-3">Order</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">ORDER ID</th>
            <th className="text-left py-2">NAMA</th>
            <th className="text-left py-2">TANGGAL</th>
            <th className="text-left py-2">TOTAL</th>
            <th className="text-left py-2">STATUS</th>
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
                <span className={`px-2 py-1 rounded-full text-xs ${statusColor[o.status]}`}>
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
