import React from "react";

const deliveredOrders = [
  {
    id: "405926",
    date: "02 April 2025",
    status: "Delivered",
    total: "Rp11.100.000",
  },
  {
    id: "102475",
    date: "23 Maret 2025",
    status: "Delivered",
    total: "Rp2.500.000",
  },
];

const statusColor = {
  Delivered: "bg-green-200 text-green-700",
};

const Delivered = () => (
  <div className="space-y-4 md:space-y-6">
    {deliveredOrders.map((order) => (
      <div
        key={order.id}
        className="bg-white rounded-xl shadow-sm border p-4 md:p-6 flex flex-col gap-3"
      >
        <div className="font-bold text-lg md:text-xl mb-2">
          Order ID #{order.id}
        </div>
        <div className="text-black/80 mb-2 text-base md:text-lg">
          Tanggal: {order.date}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium text-base md:text-lg">Status:</span>
          <span
            className={`px-4 py-1 rounded-full text-base md:text-lg font-semibold ${
              statusColor[order.status]
            }`}
          >
            {order.status}
          </span>
        </div>
        <div className="font-bold text-lg md:text-xl mb-2">
          Total: {order.total}
        </div>
        <div className="w-full flex justify-center mt-2">
          <button className="bg-black text-white rounded-full px-8 py-3 font-semibold text-base md:text-lg shadow hover:bg-gray-900 transition-colors w-full md:w-auto">
            Beri Nilai
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default Delivered;
