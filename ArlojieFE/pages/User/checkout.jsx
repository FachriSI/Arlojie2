import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
    const navigate = useNavigate();
    const location = useLocation();
    const { alamat, cartItems } = location.state || {};

    const [showTerms, setShowTerms] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const [totalHarga, setTotalHarga] = useState(0);
    const [shippingMethod, setShippingMethod] = useState(10000);
    const shippingOptions = [
        { label: 'SiCepat', value: 8000 },
        { label: 'JNE', value: 10000 },
        { label: 'TIKI', value: 12000 }
    ];

    useEffect(() => {
        document.title = 'Arlojie | Checkout';
        if (!alamat || !cartItems || cartItems.length === 0) {
            navigate('/keranjang', { replace: true });
        }
    }, [alamat, cartItems, navigate]);

    useEffect(() => {
        if (cartItems) {
            const subtotal = cartItems.reduce(
                (sum, item) => sum + (item.product?.price || 0) * item.quantity,
                0
            );
            setTotalHarga(subtotal + shippingMethod);
        }
    }, [cartItems, shippingMethod]);

  // Safe image URL builder for products (handles JSON string or array)
  const getImageSrc = (product) => {
    try {
      const imgs = product?.images;
      if (!imgs) return '/vite.svg';
      const arr = typeof imgs === 'string' ? JSON.parse(imgs) : imgs;
      if (!Array.isArray(arr) || arr.length === 0) return '/vite.svg';
      const first = arr[0];
      if (!first) return '/vite.svg';
      if (String(first).startsWith('http')) return first;
      if (String(first).startsWith('/')) return `http://localhost:3000${first}`;
      return `http://localhost:3000/uploads/products/${first}`;
    } catch {
      return '/vite.svg';
    }
  };
    // -------------------------

    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert({ show: false, type: '', message: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert.show]);

    const showAlert = (type, message) => setAlert({ show: true, type, message });

   const handleCreateOrder = async () => {
        if (!isAgreed) return showAlert('error', 'Anda harus menyetujui Syarat dan Ketentuan.');
        if (!paymentMethod) return showAlert('error', 'Anda harus memilih Metode Pembayaran.');

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem("userId");

            if (!token || !userId) {
                showAlert('error', 'Sesi Anda telah berakhir, silakan login kembali.');
                navigate('/login');
                return;
            }

            // determine shipping label from selected shippingMethod value
            const selectedShippingLabel = shippingOptions.find(opt => opt.value === shippingMethod)?.label || 'Tidak Diketahui';

            // Map UI selections to DB enum values
            const shippingLabelMap = {
              'SiCepat': 'SiCepat',
              'JNE': 'JNE',
              'TIKI': 'Tiki', // backend expects 'Tiki'
              'Tiki': 'Tiki'
            };

            const paymentMap = {
              bca: 'TRANSFER BANK',
              bni: 'TRANSFER BANK',
              mandiri: 'TRANSFER BANK',
              gopay: 'E-WALLET',
              ovo: 'E-WALLET',
              dana: 'E-WALLET',
              cod: 'COD'
            };

            const shippingEnum = shippingLabelMap[selectedShippingLabel] || selectedShippingLabel;
            const paymentEnum = paymentMap[paymentMethod] || (paymentMethod ? paymentMethod.toUpperCase() : null);

            const orderData = {
                userId,

                // Data Alamat (langsung dari objek 'alamat')
                namaLengkap: alamat.namaLengkap,
                nomorTelepon: alamat.nomorTelepon,
                provinsi: alamat.provinsi,
                kota: alamat.kota,
                kecamatan: alamat.kecamatan,
                kelurahan: alamat.kelurahan,
                alamatLengkap: alamat.alamatLengkap, // Ini berisi "Nama Jalan, No Rumah"
                kodePos: alamat.kodePos,

                // Data Transaksi (normalized to DB enum values)
                shippingMethod: shippingEnum,
                paymentMethod: paymentEnum,
                totalPrice: totalHarga,

                // Data Item (untuk tabel 'order_items')
        items: cartItems.map(item => ({
          productId: item.productId || item.product?.id || item.productId,
          quantity: item.quantity,
          price: item.product?.price || item.price || 0,
        })),
            };

      if (!cartItems || cartItems.length === 0) {
                showAlert("error", "Keranjang belanja Anda kosong.");
                setIsLoading(false);
                return;
            }

      // Validate: do not allow checkout if any product is inactive/nonaktif
      const inactiveItems = (cartItems || []).filter(item => {
        const status = (item.product?.status || item.status || '').toString().toLowerCase();
        return status && status !== 'aktif';
      });
      if (inactiveItems.length > 0) {
        const names = inactiveItems.map(i => i.product?.name || i.name || 'Produk').join(', ');
        showAlert('error', `Produk berikut sedang nonaktif/tidak dijual saat ini: ${names}. Silakan hapus produk tersebut dari keranjang terlebih dahulu.`);
        setIsLoading(false);
        return;
      }

            await axios.post('http://localhost:3000/api/orders', orderData, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            
            showAlert('success', 'Pesanan berhasil dibuat!');
            
            setTimeout(() => {
                navigate('/ordermanage');
            }, 2000);

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan saat membuat pesanan.';
            showAlert('error', errorMessage);
            console.error('Gagal membuat pesanan:', error.response?.data || error); 
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="min-h-screen bg-white">
      {/* Alert Component */}
      <div
        className={`fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out px-4 ${
          alert.show
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-full opacity-0 scale-95"
        }`}
      >
        <div
          className={`px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-2xl backdrop-blur-md border flex items-center space-x-3 min-w-[280px] md:min-w-[360px] transition-all duration-300 ${
            alert.type === "success"  
              ? "bg-white/95 border-gray-200 text-gray-800"
              : "bg-black/95 border-gray-700 text-white"
          }`}
        >
          <div
            className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center ${
              alert.type === "success" ? "bg-black" : "bg-white"
            }`}
          >
            <svg
              className={`w-3 h-3 md:w-4 md:h-4 ${
                alert.type === "success" ? "text-white" : "text-black"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  alert.type === "success"
                    ? "M5 13l4 4L19 7"
                    : "M6 18L18 6M6 6l12 12"
                }
              />
            </svg>
          </div>
          <p className="font-medium text-xs md:text-sm flex-1">
            {alert.message}
          </p>
          <button
            onClick={() => setAlert({ show: false, type: "", message: "" })}
            className={`flex-shrink-0 ml-2 md:ml-4 transition-all duration-200 hover:scale-110 ${
              alert.type === "success"
                ? "text-gray-400 hover:text-gray-600"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <svg
              className="w-3 h-3 md:w-4 md:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      
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
            {/* Tampilkan data alamat dari useLocation */}
            {alamat ? (
              <div className="flex flex-col md:flex-row md:items-center md:gap-8">
                <div className="font-semibold text-black mb-1 md:mb-0">
                  {alamat.namaLengkap} <br />
                  <span className="font-normal text-black/80">{alamat.nomorTelepon}</span>
                </div>
                <div className="text-black/90 md:border-l md:pl-8 md:ml-8">
                  {`${alamat.alamatLengkap}, Kel. ${alamat.kelurahan}, Kec. ${alamat.kecamatan}, Kota ${alamat.kota}, ${alamat.provinsi}`}
                  {alamat.detailLainnya && <>, ({alamat.detailLainnya})</>}
                </div>
              </div>
            ) : (
              <p>Memuat alamat pengiriman...</p>
            )}
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
          {cartItems && cartItems.length > 0 ? (
            cartItems.map(item => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-center border-b pb-6">
                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={getImageSrc(item.product)}
                    alt={item.product?.name || "Produk"}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <span className="font-medium text-black">
                    {item.product?.name || "-"}
                  </span>
                </div>
                <div className="col-span-2 text-center font-medium text-black">
                  Rp{(item.product?.price || 0).toLocaleString("id-ID")}
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className="px-6 py-2 text-xl font-semibold">{item.quantity}</span>
                </div>
                <div className="col-span-2 text-center font-semibold text-black text-lg">
                  Rp{((item.product?.price || 0) * item.quantity).toLocaleString("id-ID")}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-4">Tidak ada produk dalam pesanan.</p>
          )}
          {/* Ekspedisi */}
          <div className="max-w-7xl mx-auto px-2 md:px-0 mt-8">
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-3m-4-6l4-4m0 0l4 4m-4-4v12" />
              </svg>
              <h2 className="text-lg font-semibold text-black">
                Pilih Metode Pengiriman
              </h2>
            </div>
            <div className="space-y-3">
              {shippingOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    shippingMethod === option.value
                      ? "border-black bg-gray-100 ring-2 ring-black"
                      : "border-gray-200 bg-white hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value={option.value}
                      checked={shippingMethod === option.value}
                      onChange={(e) => setShippingMethod(Number(e.target.value))}
                      className="accent-black h-5 w-5 cursor-pointer"
                    />
                    <span className="font-semibold text-black">{option.label}</span>
                  </div>
                  <span className="font-bold text-black">
                    Rp{option.value.toLocaleString("id-ID")}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
          {/* Grand Total */}
          <div className="flex justify-end items-center pt-6">
            <span className="mr-8 text-black font-medium text-lg">
              Grand Total
            </span>
            <span className="text-2xl font-bold text-black">
              Rp{totalHarga.toLocaleString("id-ID")}
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
                <span className="font-semibold">Produk:</span>{" "}
                {cartItems?.map(item => `${item.product.name} (${item.quantity})`).join(', ') || 'Tidak ada produk'}
              </div>
              <div>
                <span className="font-semibold">Alamat:</span>{" "}
                {alamat ? (
                  `${alamat.alamatLengkap}, Kel. ${alamat.kelurahan}, Kec. ${alamat.kecamatan}, Kota ${alamat.kota}, ${alamat.provinsi}`
                ) : (
                  "Alamat belum diisi."
                )}
              </div>
              <div>
                <span className="font-semibold">Ekspedisi:</span>{" "}
                {shippingOptions.find((opt) => opt.value === shippingMethod)?.label}
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
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
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
            <button
              className={`bg-black text-white px-12 py-3 rounded-2xl font-medium text-lg transition-colors ${
                isLoading || !isAgreed || !paymentMethod
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-900"
              }`}
              onClick={handleCreateOrder}
              disabled={isLoading || !isAgreed || !paymentMethod}
            >
              {isLoading ? "Membuat Pesanan..." : "Buat Pesanan"}
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