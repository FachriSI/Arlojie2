import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Order from "../../assets/ordermanage/order.svg";
import Deliver from "../../components/delivered";
import Footer from "../../components/footer";
import Detail from "../../components/detail";
import Rating from "../../components/rating";

export const Ordermanage = () => {
  useEffect(() => {
    document.title = "Arlojie | Order Manage";
  }, []);

  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showRating, setShowRating] = useState(false);

  const orders = [
    {
      id: "348053",
      date: "11 April 2025",
      status: "Packed",
      total: "Rp.9.115.000",
      nama: "Akmal",
      produk: "Longiness Master (1)",
      alamat:
        "Jln. Raya Kampung Baru, Kelurahan Kampung Baru, Lubuk Kilangan, (disamping kedai ibuk) KOTA PADANG, SUMATERA BARAT",
      ekspedisi: "TIKI",
      pembayaran: "COD",
    },
    {
      id: "405926",
      date: "02 April 2025",
      status: "Delivered",
      total: "Rp11.100.000",
    },
    {
      id: "102475",
      date: "23 Maret 2025",
      status: "Shipped",
      total: "Rp2.500.000",
    },
    {
      id: "957394",
      date: "14 Maret 2025",
      status: "Pending",
      total: "Rp875.000",
    },

    {
      id: "9879881",
      date: "23 Maret 2025",
      status: "Paid",
      total: "Rp815.000",
    },
  ];

  const statusColor = {
    Packed: "bg-blue-200 text-blue-700",
    Delivered: "bg-green-200 text-green-700",
    Pending: "bg-orange-200 text-orange-700",
    Paid: "bg-purple-200 text-purple-700",
    Shipped: "bg-yellow-200 text-yellow-700",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-[100] bg-black">
        <Navbar />
      </div>

      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative h-64 bg-gradient-to-r from-gray-900 to-black overflow-hidden">
          <img
            src={Order}
            alt="Arlojie Order"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16">
            <h1 className="text-white text-3xl md:text-4xl font-bold font-serif mb-2">
              Order Manage
            </h1>
            <p className="text-white/80 font-sans text-lg">
              Kelola Pesanan Anda
            </p>
          </div>
        </div>
        {/* Filter Riwayat Pemesanan */}
        <div className="max-w-7xl mx-auto px-2 md:px-4 mt-6 md:mt-10">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
            Riwayat Pemesanan
          </h2>
          <div className="bg-gray-100 rounded-xl p-2 md:p-4">
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-20 overflow-x-auto">
              <span className="font-medium text-black mr-2 text-sm md:text-base">
                Filter
              </span>
              {["All", "Pending", "Paid", "Packed", "Shipped", "Delivered"].map(
                (status) => (
                  <button
                    key={status}
                    className={`px-4 md:px-8 py-2 md:py-3 rounded-2xl border text-xs md:text-base font-medium transition-colors
                  ${
                    filter === status
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black hover:bg-gray-200"
                  }
                `}
                    onClick={() => setFilter(status)}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>
          {/* List Order */}
          <div className="mt-4 md:mt-8 space-y-4 md:space-y-6">
            {orders
              .filter((order) =>
                filter === "All" ? true : order.status === filter
              )
              .map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm border p-4 md:p-6 flex flex-col gap-3 md:flex-row justify-between items-start md:items-center"
                >
                  <div className="flex-1">
                    <div className="font-bold text-lg md:text-xl mb-2">
                      Order ID #{order.id}
                    </div>
                    <div className="text-black/80 mb-2 text-base md:text-lg">
                      Tanggal: {order.date}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-base md:text-lg">
                        Status:
                      </span>
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
                  </div>
                  <div className="w-full md:w-auto flex justify-center md:justify-end mt-2 md:mt-0">
                    <button
                      className="bg-[#0B132A] text-white rounded-full px-12 py-3 font-semibold text-lg shadow hover:bg-[#1a233a] transition-colors mx-auto block"
                      onClick={() => {
                        if (order.status === "Delivered") {
                          setSelectedOrder(order);
                          setShowRating(true);
                        } else {
                          setSelectedOrder(order); // Tampilkan detail
                        }
                      }}
                    >
                      {order.status === "Delivered" ? "Beri Nilai" : "Detail"}
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* MODAL RATING */}
          {showRating && selectedOrder && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
              <div className="relative">
                <Rating
                  order={selectedOrder}
                  onClose={() => {
                    setShowRating(false);
                    setSelectedOrder(null);
                  }}
                  onSubmit={() => {
                    setShowRating(false);
                    setSelectedOrder(null);
                  }}
                />
                <button
                  className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black"
                  onClick={() => {
                    setShowRating(false);
                    setSelectedOrder(null);
                  }}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
            </div>
          )}

          {/* MODAL DETAIL */}
          {selectedOrder && !showRating && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
              <div className="relative bg-white rounded-2xl shadow-xl">
                <Detail order={selectedOrder} />
                <button
                  className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black"
                  onClick={() => setSelectedOrder(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mb-12"></div>
      <Footer />
    </div>
  );
};

export default Ordermanage;
