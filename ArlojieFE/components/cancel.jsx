import React from "react";

const CancelModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex flex-col items-center">
          <svg
            className="w-16 h-16 text-red-500 mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M8 8l8 8M16 8l-8 8"
            />
          </svg>
          <h2 className="text-xl font-semibold mb-2 text-center">
            Batalkan Pesanan?
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Apakah Anda yakin ingin membatalkan pesanan ini? Tindakan ini tidak
            dapat dibatalkan.
          </p>
          <div className="flex gap-4 w-full justify-center">
            <button
              className="px-6 py-2 rounded-full border border-black text-black font-semibold bg-white hover:bg-gray-100 transition"
              onClick={onClose}
            >
              Tidak
            </button>
            <button
              className="px-6 py-2 rounded-full bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
              onClick={onConfirm}
            >
              Ya, Batalkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
