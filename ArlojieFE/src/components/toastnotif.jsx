import React from "react";

const ToastNotif = ({
  message = "Produk berhasil ditambahkan ke keranjang",
}) => (
  <>
    {/* Overlay */}
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-[99]" />
    {/* Toast di atas-tengah */}
    <div
      className="fixed top-2 left-1/2 bg-gray-100/80 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg flex items-center w-max z-[100]"
      style={{ transform: "translateX(-50%)" }}
      data-aos="zoom-in-down"
      data-aos-duration="600"
    >
      <svg
        className="w-7 h-7 text-green-600 mr-3 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="green"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M8 12l2 2l4-4"
          stroke="green"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="text-black text-lg">{message}</span>
    </div>
  </>
);

export default ToastNotif;
