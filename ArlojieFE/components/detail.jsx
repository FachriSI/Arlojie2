import React, { useState } from "react";
import axios from 'axios';
import CancelModal from "../components/cancel"; // Import modal cancel

const statusList = [
  { label: "Pending", number: 1 },
  { label: "Packed", number: 2 },
  { label: "Shipped", number: 3 },
  { label: "Delivered", number: 4 },
  { label: "Cancelled", number: 5 },
];

const Detail = ({ order }) => {
  const [showCancel, setShowCancel] = useState(false);

  // Map backend order shape to UI-friendly data
  const data = order
    ? {
        namaLengkap: order.namaLengkap || "-",
        // products: join product names if available
        produk:
              order.items && order.items.length > 0
                ? order.items.map((it) => it.productName || it.name || "").join(", ")
                : "-",
        // keep structured items for clearer rendering
        items: order.items && order.items.length > 0
          ? order.items.map((it) => ({
              name: it.productName || it.name || "-",
              qty: it.quantity || it.qty || 1,
              price: it.price || 0,
            }))
          : [],
        alamat: order.alamatLengkap,
        ekspedisi: order.shippingMethod || "-",
        pembayaran: order.paymentMethod || "-",
        shippingMethod: order.shippingMethod || "-",
        paymentMethod: order.paymentMethod || "-",
        status: order.status || "pending",
      }
    : {
        namaLengkap: "Akmal",
        produk: "Longiness Master (1)",
        alamat:
          "Jln. Raya Kampung Baru, Kelurahan Kampung Baru, Lubuk Kilangan, (disamping kedai ibuk) KOTA PADANG, SUMATERA BARAT",
        ekspedisi: "TIKI",
        pembayaran: "COD",
        shippingMethod: "TIKI",
        paymentMethod: "COD",
        status: "Packed",
      };

    // Tentukan step aktif berdasarkan status (normalize to lowercase)
  const statusToNumber = {
    pending: 1,
    paid: 2,
    packed: 3,
    shipped: 4,
    delivered: 5,
  };
  const currentStep = statusToNumber[(data.status || "").toLowerCase()] || 1;

  const handleCancelOrder = () => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Anda harus login untuk melakukan pembatalan.');
          return;
        }
        if (!order || !order.id) {
          alert('Tidak ada pesanan yang dipilih.');
          return;
        }
        const resp = await axios.delete(`http://localhost:3000/api/orders/${order.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert(resp.data?.message || 'Pesanan dibatalkan.');
        setShowCancel(false);
        // navigate back to order list
        window.location.href = '/ordermanage';
      } catch (err) {
        console.error('Gagal membatalkan pesanan:', err.response?.data || err.message);
        alert('Gagal membatalkan pesanan.');
        setShowCancel(false);
      }
    })();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Detail Pemesanan</h2>
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-8">
        <div className="mb-3">
          <span className="font-medium">Nama Penerima:</span> {data.namaLengkap || '-'}
        </div>
        <div className="mb-3">
          <span className="font-medium">Produk:</span>
          <div className="mt-2">
            {data.items && data.items.length > 0 ? (
              data.items.map((p, idx) => (
                <div key={idx} className="text-sm text-gray-700 flex items-center justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span>{p.name}</span>
                      {data.status && data.status.toLowerCase() === 'cancelled' && (
                        <span className="inline-block bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">
                          Dibatalkan
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">Qty: {p.qty} • Rp{Number(p.price).toLocaleString('id-ID')}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-700">{data.produk || '-'}</div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <span className="font-bold">Alamat:</span> {data.alamat || '-'}
        </div>
        <div className="mb-3">
          <span className="font-medium">Ekspedisi:</span> {data.shippingMethod || '-'}
        </div>
        <div>
          <span className="font-medium">Pembayaran:</span> {data.paymentMethod || '-'}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Tracking</h2>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 flex items-center justify-between mb-8">
          {statusList.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center w-32">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                    ${
                      currentStep >= step.number
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                >
                  {step.number}
                </div>
                <span
                  className={`mt-2 text-base font-medium
                    ${
                      currentStep >= step.number
                        ? "text-black"
                        : "text-gray-400"
                    }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < statusList.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2
                    ${currentStep > step.number ? "bg-black" : "bg-gray-200"}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {data.status && data.status.toLowerCase() === 'cancelled' ? (
          <div className="mt-6 px-6 py-2 rounded border border-red-600 text-white bg-red-600 hover:bg-red-700 font-semibold">
            Pesanan dibatalkan.
          </div>
        ) : (
          <>
            <button
              className="mt-6 px-6 py-2 rounded border border-red-500 text-red-500 hover:bg-red-50 font-semibold"
              onClick={() => setShowCancel(true)}
            >
              Batalkan Pesanan
            </button>
            <CancelModal
              open={showCancel}
              onClose={() => setShowCancel(false)}
              onConfirm={handleCancelOrder}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Detail;
