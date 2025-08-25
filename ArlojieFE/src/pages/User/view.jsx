import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ToastNotif from "../../components/toastnotif";
import Watch1 from "../../assets/Home/jam1.svg";
import Watch2 from "../../assets/Home/jam2.svg";
import Watch3 from "../../assets/Home/jam3.svg";
import Watch4 from "../../assets/Home/jam4.svg";
import Watch5 from "../../assets/Home/jam5.svg";
import Watch6 from "../../assets/Home/jam6.svg";
import Watch7 from "../../assets/Home/jam2.svg";
import Watch8 from "../../assets/Home/jam5.svg";

export const View = () => {
  useEffect(() => {
    document.title = "Arlojie | View";
  }, []);

  const images = [Watch1, Watch2, Watch3];
  const [mainImage, setMainImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Tambahkan state dan fungsi wishlist
  const [wishlist, setWishlist] = useState(false);

  const toggleWishlist = () => {
    setWishlist((prev) => !prev);
  };

  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/keranjang");
    }, 3000); // Toast muncul 3 detik
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ToastNotif harus di sini, sebelum konten lain */}
      {showToast && (
        <ToastNotif
          message="Berhasil ditambahkan ke keranjang!"
          type="success"
        />
      )}
      {/* Navbar */}
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

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 mt-6 mb-4 text-sm text-black/70">
        <span className="hover:underline cursor-pointer">Beranda</span> &gt;{" "}
        <span className="hover:underline cursor-pointer">Jam Tangan Pria</span>{" "}
        &gt; <span className="hover:underline cursor-pointer">Longines</span>{" "}
        &gt; <span className="font-semibold text-black">Longines Master</span>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Gallery */}
        <div className="flex flex-row md:flex-col gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`bg-white rounded-xl border p-2 transition-all ${
                mainImage === img ? "ring-2 ring-black" : ""
              }`}
              onClick={() => setMainImage(img)}
            >
              <img
                src={img}
                alt={`Watch ${idx + 1}`}
                className="w-24 h-24 object-contain"
              />
            </button>
          ))}
        </div>
        {/* Main Image */}
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-white rounded-2xl p-6 flex justify-center items-center shadow-sm w-full">
            <img
              src={mainImage}
              alt="Main Watch"
              className="max-h-[350px] object-contain"
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-black/70">Longines</span>
            {/* Heart Icon - Add to Wishlist */}
            <button onClick={toggleWishlist} className="relative z-20">
              <svg
                className={`w-6 h-6 hover:scale-110 transition-all duration-300 ${
                  wishlist
                    ? "text-red-500 fill-current"
                    : "text-black hover:text-red-500"
                }`}
                fill={wishlist ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          <div className="text-2xl font-bold leading-snug">
            Longines Master AC 6570 Silver
            <br />
            Stainless Steel Strap
          </div>
          <div className="flex items-center gap-4 text-black/70 text-base border-b pb-2">
            <span>(4.0)</span>
            <span>★★★★★</span>
            <span>|</span>
            <span>2,1RB Penilaian</span>
            <span>|</span>
            <span>3RB Terjual</span>
          </div>
          <div className="text-3xl font-bold text-black pt-2 pb-4 border-b">
            Rp4.545.000
          </div>
          {/* Kuantitas */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center border rounded-full overflow-hidden">
              <button
                className="px-3 py-1 text-xl"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="px-5 py-1 text-lg font-semibold">
                {quantity}
              </span>
              <button
                className="px-3 py-1 text-xl"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <span className="text-black/60 ml-2">Tersedia 102</span>
          </div>
          {/* Wishlist & Keranjang */}
          <div className="flex gap-4 mt-4">
            <button
              className="flex-1 border border-black rounded-full py-3 font-medium hover:bg-black hover:text-white transition-colors"
              onClick={() => navigate("/wishlist")}
            >
              + Wishlist
            </button>
            <button
              className="flex-1 bg-black text-white rounded-full py-3 font-medium hover:bg-gray-900 transition-colors"
              onClick={handleAddToCart}
            >
              Tambah ke Keranjang
            </button>
          </div>
          {/* Garansi */}
          <div className="flex items-center gap-2 mt-6 text-black/80">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3l8 4v5c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V7l8-4z"
              />
            </svg>
            <span className="font-medium">Garansi Jam Tangan</span>
            <span className="ml-2">1 bulan</span>
          </div>
        </div>
      </div>

      {/* Deskripsi & Spesifikasi */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-gray-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            Deskripsi & Spesifikasi
          </h2>
          <p className="mb-4">
            Tampil percaya diri dengan ChronoLuxe Classic Black, jam tangan pria
            bergaya elegan dengan desain minimalis modern. Dibalu warna hitam
            pekat dan detail stainless steel, jam ini cocok untuk acara formal
            maupun kasual. Dengan fitur tahan air dan chronograph presisi, waktu
            Anda jadi lebih berkelas.
          </p>
          <div className="text-black">
            <div>Tipe: Analog</div>
            <div>Diameter Casing: 40 mm</div>
            <div>Material Casing: Stainless Steel</div>
            <div>Tali: Stainless Steel</div>
            <div>
              Ketahanan Air: 5 ATM (tahan cipratan air dan hujan ringan)
            </div>
            <div>Fitur Tambahan: Stopwatch, tanggal</div>
            <div>Garansi: 1 bulan</div>
          </div>
        </div>
      </div>

      {/* Rekomendasi Produk Serupa */}
      <div className="bg-gray-100 py-12 md:py-16 px-4 md:px-16 mt-10">
        <h2 className="text-2xl font-bold mb-8">REKOMENDASI PRODUK SERUPA</h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              Watch1,
              Watch2,
              Watch3,
              Watch4,
              Watch1,
              Watch2,
              Watch3,
              Watch4,
            ].map((img, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center"
              >
                <img
                  src={img}
                  alt="Rekomendasi Jam"
                  className="w-32 h-32 object-contain mb-4"
                />
                <div className="w-full text-left mb-2">
                  <div className="font-bold text-sm text-gray-900">
                    LONGINES MASTER
                  </div>
                  <div className="font-semibold text-base text-gray-900 mb-1">
                    Rp 4.545.000
                  </div>
                  <div className="text-xs text-gray-700 mb-1">
                    Automatic Watch
                    <br />
                    Stainless Steel Strap
                  </div>
                  <div className="flex items-center gap-1 text-xs text-black font-semibold mb-2">
                    ★★★★☆{" "}
                    <span className="text-gray-500 font-normal">(4.0)</span>
                  </div>
                </div>
                <button
                  className="w-full border border-black rounded-full py-2 text-sm hover:bg-black hover:text-white transition-colors"
                  onClick={() => navigate("/view")}
                >
                  Quick View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default View;
