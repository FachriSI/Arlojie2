import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import TermsModal from "../../components/termsmodal";
import Footer from "../../components/footer";
import ArlojieCheckout from "../../assets/checkout/arlojiecheckout.svg";
import BNI from "../../assets/checkout/bni.png";
import BCA from "../../assets/checkout/bca.png";
import Mandiri from "../../assets/checkout/mandiri.webp";
import Gopay from "../../assets/checkout/gopay.png";
import OVO from "../../assets/checkout/ovo.png";
import DANA from "../../assets/checkout/dana.png";
export const Checkout = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  // State untuk kuantitas dan harga
  const [quantity, setQuantity] = useState(2);
  const price = 4545000;
  const shippingOptions = [
    { label: "JNE", value: 10000 },
    { label: "TIKI", value: 12000 },
    { label: "SiCepat", value: 8000 },
  ];
  const [selectedShipping, setSelectedShipping] = useState(
    shippingOptions[0].value
  );

  // Handler untuk hapus produk
  const handleDelete = () => {
    setIsDeleted(true);
  };

  // Hitung total harga produk dan grand total
  const totalHarga = isDeleted ? 0 : price * quantity;
  const grandTotal = totalHarga + selectedShipping;

  useEffect(() => {
    document.title = "Arlojie | Checkout";
  }, []);

  // Handler untuk tambah/kurang kuantitas
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/*Navbar */}
      <div className="relative z-50 bg-black">
        <div
          className="bg-black"
          data-aos="fade-down"
          data-aos-delay="300"
          data-aos-duration="1200"
        >
          <Navbar />
        </div>
      </div>

      {/*Hero Section*/}
      <div className="relative h-64 bg-gradient-to-r from-gray-900 to-black overflow-hidden">
        <img
          src={ArlojieCheckout}
          alt="Checkout Arlojie"
          className="absolute inset-0 bg-cover bg-center h-64 w-full object-cover opacity-50"
        />
        {/*Content*/}
        <div
          className="relative z-10 flex flex-col justify-center h-full px-6"
          data-aos="fade-right"
          data-aos-delay="300"
          data-aos-duration="1200"
        >
          <h1 className="text-white text-3xl font-bold font-serif mb-2">
            Checkout
          </h1>
          <p className="text-white/80 font-sans text-lg">
            Selesaikan Pembelian Jam Pilihanmu
          </p>
        </div>
      </div>
      {/* Proses Pengiriman */}
      <div className="max-w-7xl mx-auto px-2 md:px-0 mt-8">
        <div className="bg-gray-50 rounded-xl p-6 flex items-start gap-6 shadow-sm border">
          <div className="pt-1">
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <circle
                cx="12"
                cy="11"
                r="3"
                stroke="currentColor"
                strokeWidth={2}
              />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-black mb-2">
              Proses Pengiriman
            </h2>
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="font-semibold text-black mb-1 md:mb-0">
                Akmal <br />
                <span className="font-normal text-black/80">082976395395</span>
              </div>
              <div className="text-black/90 md:border-l md:pl-8 md:ml-8">
                Jln. Raya Kampung Baru, Kelurahan Kampung Baru, Lubuk Kilangan,
                (disamping kedai ibuk) <br />
                KOTA PADANG, ID 20224
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Produk Dipesan */}
      <div className="max-w-7xl mx-auto px-2 md:px-0 mt-8">
        <div className="bg-gray-50 rounded-xl p-6 flex flex-col gap-0 shadow-sm border">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 pb-6">
            <div className="col-span-5">
              <h2 className="text-lg font-semibold text-black mb-2">
                Produk Dipesan
              </h2>
            </div>
            <div className="col-span-2 flex items-end justify-center text-gray-400 font-semibold">
              Harga Satuan
            </div>
            <div className="col-span-2 flex items-end justify-center text-gray-400 font-semibold">
              Kuantitas
            </div>
            <div className="col-span-2 flex items-end justify-center text-gray-400 font-semibold">
              Total Harga
            </div>
            <div className="col-span-1"></div>
          </div>
          {/* Produk */}
          {!isDeleted && (
            <div className="grid grid-cols-12 gap-4 items-center border-b pb-6">
              <div className="col-span-5 flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=96&q=80"
                  alt="Longines Master AC 6570 Silver Stainless Steel Strap"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <span className="font-medium text-black">
                  Longines Master AC 6570 Silver
                  <br />
                  Stainless Steel Strap
                </span>
              </div>
              <div className="col-span-2 text-center font-medium text-black">
                Rp{price.toLocaleString("id-ID")}
              </div>
              <div className="col-span-2 flex justify-center">
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                  <button
                    className="px-4 py-2 text-black text-xl"
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-6 py-2 text-xl font-semibold">
                    {quantity}
                  </span>
                  <button
                    className="px-4 py-2 text-black text-xl"
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-span-2 text-center font-semibold text-black text-lg">
                Rp{totalHarga.toLocaleString("id-ID")}
              </div>
              <div className="col-span-1 text-center">
                <button onClick={handleDelete}>
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
          {/* Opsi Pengiriman */}
          <div className="border-b pt-6 pb-6">
            <div className="font-semibold text-black mb-4">Opsi Pengiriman</div>
            <div className="flex flex-col gap-2">
              {shippingOptions.map((option) => (
                <label
                  key={option.label}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="shipping"
                    className="accent-black cursor-pointer"
                    checked={selectedShipping === option.value}
                    onChange={() => setSelectedShipping(option.value)}
                  />
                  <span className="flex-1">{option.label}</span>
                  <span className="font-medium">
                    Rp{option.value.toLocaleString("id-ID")}
                  </span>
                </label>
              ))}
            </div>
          </div>
          {/* Grand Total */}
          <div className="flex justify-end items-center pt-6">
            <span className="mr-8 text-black font-medium text-lg">
              Grand Total
            </span>
            <span className="text-2xl font-bold text-black">
              Rp{grandTotal.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
      {/* Metode Pembayaran & Review Pemesanan */}
      <div className="max-w-7xl mx-auto px-2 md:px-0 mt-8">
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border flex flex-col gap-0">
          {/* Metode Pembayaran */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 14l2-2 4 4m0 0l-4-4-2 2m6-6v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-black">
                Metode Pembayaran
              </h2>
            </div>
            <div className="flex flex-wrap gap-8 mb-6">
              {/* Transfer Bank */}
              <div>
                <div className="font-semibold mb-2">Transfer Bank</div>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="bca"
                      checked={paymentMethod === "bca"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-black cursor-pointer"
                    />
                    <img
                      src={BCA}
                      alt="BCA"
                      className="w-16 h-8 object-contain bg-white rounded"
                    />
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="bni"
                      checked={paymentMethod === "bni"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-black cursor-pointer"
                    />
                    <img
                      src={BNI}
                      alt="BNI"
                      className="w-16 h-8 object-contain bg-white rounded"
                    />
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="mandiri"
                      checked={paymentMethod === "mandiri"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-black cursor-pointer"
                    />
                    <img
                      src={Mandiri}
                      alt="Mandiri"
                      className="w-16 h-8 object-contain bg-white rounded"
                    />
                  </label>
                </div>
              </div>
              {/* E-Wallet */}
              <div>
                <div className="font-semibold mb-2">E - Wallet</div>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="gopay"
                      checked={paymentMethod === "gopay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-black cursor-pointer"
                    />
                    <img
                      src={Gopay}
                      alt="Gopay"
                      className="w-16 h-8 object-contain bg-white rounded"
                    />
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="ovo"
                      checked={paymentMethod === "ovo"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-black cursor-pointer"
                    />
                    <img
                      src={OVO}
                      alt="OVO"
                      className="w-16 h-8 object-contain bg-white rounded"
                    />
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="dana"
                      checked={paymentMethod === "dana"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-black cursor-pointer"
                    />
                    <img
                      src={DANA}
                      alt="DANA"
                      className="w-16 h-8 object-contain bg-white rounded"
                    />
                  </label>
                </div>
              </div>
              {/* COD */}
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-3 font-semibold cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-black cursor-pointer"
                  />
                  COD (Cash On Delivery)
                </label>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          {/* Review Pemesanan */}
          <div className="mb-6">
            <div className="font-semibold mb-2">Review Pemesanan</div>
            <div className="space-y-1">
              <div>
                <span className="font-semibold">Produk:</span> Longines Master (
                {quantity} )
              </div>
              <div>
                <span className="font-semibold">Alamat:</span> Jln. Raya Kampung
                Baru, Kelurahan Kampung Baru, Lubuk Kilangan, (disamping kedai
                ibuk) KOTA PADANG, ID 20224
              </div>
              <div>
                <span className="font-semibold">Ekspedisi:</span>{" "}
                {
                  shippingOptions.find((opt) => opt.value === selectedShipping)
                    ?.label
                }
              </div>
              <div>
                <span className="font-semibold">Pembayaran:</span>{" "}
                {paymentMethod
                  ? {
                      bca: "BCA",
                      bni: "BNI",
                      mandiri: "Mandiri",
                      gopay: "Gopay",
                      ovo: "OVO",
                      dana: "DANA",
                      cod: "COD",
                    }[paymentMethod]
                  : "-"}
              </div>
            </div>
          </div>
          {/* Syarat dan Buat Pesanan */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-black w-5 h-5 cursor-pointer"
              />
              <span>
                Saya setuju dengan{" "}
                <button
                  type="button"
                  className="underline font-semibold cursor-pointer"
                  onClick={() => setShowTerms(true)}
                >
                  Syarat dan Ketentuan
                </button>
              </span>
            </label>
            <button className="bg-black text-white px-12 py-3 rounded-2xl font-medium text-lg hover:bg-gray-900 transition-colors">
              Buat Pesanan
            </button>
          </div>
        </div>
      </div>
      <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
      <div className="mb-12"></div>
      <Footer />
    </div>
  );
};

export default Checkout;

