import React from "react";

const statusList = [
  { label: "Pending", number: 1 },
  { label: "Paid", number: 2 },
  { label: "Packed", number: 3 },
  { label: "Shipped", number: 4 },
  { label: "Delivered", number: 5 },
];

const Detail = ({ order }) => {
  // Data default jika props order tidak ada
  const data = order || {
    nama: "Akmal",
    produk: "Longiness Master (1)",
    alamat:
      "Jln. Raya Kampung Baru, Kelurahan Kampung Baru, Lubuk Kilangan, (disamping kedai ibuk) KOTA PADANG, SUMATERA BARAT",
    ekspedisi: "TIKI",
    pembayaran: "COD",
    status: "Packed",
  };

  // Tentukan step aktif berdasarkan status
  const currentStep = statusList.findIndex((s) => s.label === data.status) + 1;

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
        <button className="border-2 border-red-500 text-red-500 rounded-xl px-8 py-3 font-medium bg-transparent hover:bg-red-50 transition-colors">
          Batalkan Pesanan
        </button>
      </div>
    </div>
  );
};

export default Detail;
