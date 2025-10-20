import React from "react";

const TermsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      <div className="bg-white rounded-2xl p-8 w-[90%] max-w-lg shadow-2xl relative font-playfair">
        <h2 className="text-2xl font-semibold text-center text-black mb-6 tracking-wide">
          Syarat & Ketentuan
        </h2>

        <ul className="text-sm text-gray-800 space-y-4 leading-relaxed">
          <li>
            1. Gambar produk dapat berbeda dari barang fisik karena pencahayaan
            atau layar.
          </li>
          <li>
            2. Pembatalan pesanan hanya bisa dilakukan sebelum proses pengiriman
            dimulai.
          </li>
          <li>
            3. Estimasi pengiriman bersifat tentatif tergantung wilayah dan
            ekspedisi.
          </li>
          <li>
            4. Produk yang rusak karena kesalahan pengguna tidak dapat
            dikembalikan.
          </li>
          <li>
            5. Pengajuan pengembalian maksimal 7 hari setelah produk diterima.
          </li>
          <li>
            6. Data transaksi akan disimpan untuk keperluan layanan dan
            keamanan.
          </li>
          <li>
            7. Dengan mendaftar, Anda menyetujui seluruh ketentuan di situs
            Arlojie.
          </li>
        </ul>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-black text-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
