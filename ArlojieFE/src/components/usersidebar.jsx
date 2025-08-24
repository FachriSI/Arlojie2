import React from "react";
import { useNavigate } from "react-router-dom";

const UserSidebar = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-100 flex">
      <div className="bg-gray-100/60 backdrop-blur-lg w-[90vw] max-w-sm h-full p-8 relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-3xl font-bold"
        >
          &times;
        </button>
        {/* Logo */}
        <div className="text-center text-4xl font-bold mb-10 tracking-wide">
          ARLOJIE
        </div>
        {/* Menu */}
        <div className="space-y-6">
          <button
            onClick={() => {
              navigate("/");
              onClose();
            }}
            className="flex justify-between items-center w-full text-lg font-medium py-2"
          >
            BERANDA <span>&#8250;</span>
          </button>
          <button
            onClick={() => {
              navigate("/wishlist");
              onClose();
            }}
            className="flex justify-between items-center w-full text-lg font-medium py-2"
          >
            WISHLIST <span>&#8250;</span>
          </button>
          <button
            onClick={() => {
              navigate("/keranjang");
              onClose();
            }}
            className="flex justify-between items-center w-full text-lg font-medium py-2"
          >
            KERANJANG BELANJA <span>&#8250;</span>
          </button>
          <button
            onClick={() => {
              navigate("/ordermanage");
              onClose();
            }}
            className="flex justify-between items-center w-full text-lg font-medium py-2"
          >
            RIWAYAT BELANJA <span>&#8250;</span>
          </button>
        </div>
        <hr className="my-8" />
        {/* Akun & Layanan */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-lg">
            {/* Akun Saya */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4" stroke="black" strokeWidth="2" />
              <path
                d="M4 20c0-4 4-6 8-6s8 2 8 6"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Akun Saya
          </div>
          <div className="flex items-center gap-3 text-lg">
            {/* Ganti ikon Layanan Costumer dengan headset */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M4 17v-3a8 8 0 0116 0v3"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="2"
                y="17"
                width="4"
                height="4"
                rx="2"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="18"
                y="17"
                width="4"
                height="4"
                rx="2"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Layanan Costumer
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
              onClose();
            }}
            className="flex items-center gap-3 text-lg font-medium w-full text-left"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2h-3a2 2 0 01-2-2V7a2 2 0 012-2h3a2 2 0 012 2v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
      {/* Klik area luar sidebar untuk close */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

export default UserSidebar;
