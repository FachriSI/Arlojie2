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
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 20v-2m0-4v-4m0-4V4m0 16a8 8 0 100-16 8 8 0 000 16z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 16v1a3 3 0 006 0v-1"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Layanan Costumer
          </div>
        </div>
      </div>
      {/* Klik area luar sidebar untuk close */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

export default UserSidebar;
