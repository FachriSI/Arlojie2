import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import Order from "../../assets/ordermanage/order.svg";
import Footer from "../../components/footer";
import Detail from "../../components/detail";
import Rating from "../../components/rating";

export const Ordermanage = () => {
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showRating, setShowRating] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    document.title = "Arlojie | Order Manage";
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Anda harus login untuk melihat riwayat pesanan.");
        setIsLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:3000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Format data agar sesuai dengan yang diharapkan frontend
      const formattedOrders = response.data.map(order => ({
        id: order.id,
        date: new Date(order.order_date).toLocaleDateString("id-ID"), // Format tanggal
        status: order.status, // Ambil dari field 'status' model
        total: order.total_price, // Ambil dari field 'total_price' model
        // Tambahkan detail lain jika diperlukan oleh frontend Detail component
        // Misalnya: items: order.OrderItems.map(oi => ({ ...oi.Product.toJSON(), quantity: oi.quantity }))
      }));

      setOrders(formattedOrders);
    } catch (err) {
      console.error("Gagal mengambil data pesanan:", err.response?.data || err.message);
      setError("Gagal memuat riwayat pesanan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const statusColor = {
    packed: "bg-blue-200 text-blue-700", // Pastikan lowercase
    delivered: "bg-green-200 text-green-700", // Pastikan lowercase
    pending: "bg-orange-200 text-orange-700", // Pastikan lowercase
    paid: "bg-purple-200 text-purple-700", // Pastikan lowercase
    shipped: "bg-yellow-200 text-yellow-700", // Pastikan lowercase
    cancelled: "bg-red-200 text-red-700", // Tambahkan jika ada status cancelled
  };

  if (selectedOrder && !showRating) {
    return (
      <div className="min-h-screen bg-white">
        <div className="relative z-50 bg-black">
          <Navbar />
        </div>
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
        <div className="max-w-7xl mx-auto px-2 md:px-4 mt-6 md:mt-10">
          <Detail order={selectedOrder} />
          <button
            className="mt-6 px-6 py-2 rounded bg-black text-white"
            onClick={() => setSelectedOrder(null)}
          >
            Kembali
          </button>
        </div>
        <div className="mb-12"></div>
        <Footer />
      </div>
    );
  }

  if (showRating && selectedOrder) {
    return (
      <div className="min-h-screen bg-white">
        <div className="relative z-50 bg-black">
          <Navbar />
        </div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <Rating
            onClose={() => {
              setShowRating(false);
              setSelectedOrder(null);
            }}
            onSubmit={(data) => {
              console.log("Rating dikirim:", data);
              setShowRating(false);
              setSelectedOrder(null);
            }}
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-50 bg-black">
        <Navbar />
      </div>
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
          <p className="text-white/80 font-sans text-lg">Kelola Pesanan Anda</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-2 md:px-4 mt-6 md:mt-10">
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
          Riwayat Pemesanan
        </h2>
        <div className="bg-gray-100 rounded-xl p-2 md:p-4">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-20 overflow-x-auto">
            <span className="font-medium text-black mr-2 text-sm md:text-base">
              Filter
            </span>
            {["All", "pending", "paid", "packed", "shipped", "delivered", "cancelled"].map( // Pastikan lowercase
              (status) => (
                <button
                  key={status}
                  className={`px-4 md:px-8 py-2 md:py-3 rounded-2xl border text-xs md:text-base font-medium transition-colors
                  ${
                    filter === status
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black hover:bg-gray-200"
                  }`}
                  onClick={() => setFilter(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} {/* Untuk tampilan, kapitalisasi huruf pertama */}
                </button>
              )
            )}
          </div>
        </div>

        <div className="mt-4 md:mt-8 space-y-4 md:space-y-6">
          {isLoading && <p className="text-center text-gray-500">Memuat pesanan...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!isLoading && !error && orders.length === 0 && <p className="text-center text-gray-500">Tidak ada riwayat pesanan.</p>}
          
          {!isLoading && !error && orders
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
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)} {/* Kapitalisasi untuk tampilan */}
                    </span>
                  </div>
                  <div className="font-bold text-lg md:text-xl mb-2">
                    Total: Rp{order.total.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="w-full md:w-auto flex justify-center md:justify-end mt-2 md:mt-0">
                  <button
                    className="bg-[#0B132A] text-white rounded-full px-12 py-3 font-semibold text-lg shadow hover:bg-[#1a233a] transition-colors mx-auto block"
                    onClick={() => {
                      setSelectedOrder(order);
                      if (order.status === "delivered") setShowRating(true); // Pastikan lowercase
                    }}
                  >
                    {order.status === "delivered" ? "Beri Nilai" : "Detail"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="mb-12"></div>
      <Footer />
    </div>
  );
};

export default Ordermanage;