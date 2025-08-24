import React, { useState } from "react";
import CancelModal from "../components/cancel"; // Import modal cancel

const statusList = [
  { label: "Pending", number: 1 },
  { label: "Paid", number: 2 },
  { label: "Packed", number: 3 },
  { label: "Shipped", number: 4 },
  { label: "Delivered", number: 5 },
];

const Detail = ({ order }) => {
  const [showCancel, setShowCancel] = useState(false);

  // Data order langsung dari props
  const data = order;

  // Tentukan step aktif berdasarkan status
  const currentStep = statusList.findIndex((s) => s.label === data.status) + 1;

  const handleCancelOrder = () => {
    // Lakukan aksi pembatalan pesanan di sini
    setShowCancel(false);
    // ...aksi lain jika perlu...
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Detail Pemesanan</h2>
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-8">
        <div className="mb-3">
          <span className="font-medium">Nama Penerima:</span> {data.nama}
        </div>
        <div className="mb-3">
          <span className="font-medium">Produk:</span> {data.produk}
        </div>
        <div className="mb-3">
          <span className="font-bold">Alamat:</span> {data.alamat}
        </div>
        <div className="mb-3">
          <span className="font-medium">Ekspedisi:</span> {data.ekspedisi}
        </div>
        <div>
          <span className="font-medium">Pembayaran:</span> {data.pembayaran}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Tracking</h2>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-12 w-[900px] mx-auto">
          <div className="flex items-center w-full">
            {statusList.map((step, idx) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center">
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
                    className={`flex-1 h-1 mx-2 self-center
                      ${
                        currentStep > step.number ? "bg-black" : "bg-gray-200"
                      }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
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
      </div>
    </div>
  );
};

export default Detail;
