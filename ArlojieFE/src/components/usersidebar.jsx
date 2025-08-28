import React from "react";
import { Link } from "react-router-dom";
import {
  X,
  User,
  LogOut,
  LayoutDashboard,
  Heart,
  ShoppingCart,
  Headphones,
} from "lucide-react";

const UserSidebar = ({ userData, handleLogout, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[999] flex">
      <div className="bg-gray-200 backdrop-blur-lg w-[90vw] max-w-sm h-full p-8 relative shadow-xl">
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

        {/* Welcome User */}
        <div className="mb-6 text-lg font-semibold flex items-center gap-2">
          <User className="w-6 h-6 text-black" />
          Welcome, {userData?.name ? userData.name : "User"}
        </div>

        {/* User Profile Info */}
        {userData && userData.isLoggedIn && (
          <div className="mb-6 pb-6 border-b border-gray-300">
            <p className="text-sm text-gray-600">Signed in as:</p>
            <p className="text-lg font-bold truncate">{userData.email}</p>
          </div>
        )}

        {/* Menu */}
        <div className="space-y-6">
          <Link
            to="/home"
            onClick={onClose}
            className="flex justify-between items-center w-full text-lg font-medium py-2 hover:text-gray-800 transition-colors"
          >
            BERANDA <span>&#8250;</span>
          </Link>
          <Link
            to="/wishlist"
            onClick={onClose}
            className="flex justify-between items-center w-full text-lg font-medium py-2 hover:text-gray-800 transition-colors"
          >
            WISHLIST <span>&#8250;</span>
          </Link>
          <Link
            to="/keranjang"
            onClick={onClose}
            className="flex justify-between items-center w-full text-lg font-medium py-2 hover:text-gray-800 transition-colors"
          >
            KERANJANG BELANJA <span>&#8250;</span>
          </Link>
          <Link
            to="/ordermanage"
            onClick={onClose}
            className="flex justify-between items-center w-full text-lg font-medium py-2 hover:text-gray-800 transition-colors"
          >
            RIWAYAT BELANJA <span>&#8250;</span>
          </Link>
        </div>

        {/* Garis pembatas */}
        <hr className="my-6 border-black" />

        {/* Akun & Layanan */}
        <div className="space-y-6">
          <a
            href="https://wa.me/qr/VEM4OEYRBHH6G1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg hover:text-green-600 transition-colors"
          >
            <Headphones className="w-6 h-6 text-black" />
            Layanan Customer
          </a>
          {userData && userData.isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                onClose();
              }}
              className="w-full text-left flex items-center gap-3 text-lg font-medium py-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors"
            >
              <LogOut size={24} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="w-full text-left flex items-center gap-3 text-lg font-medium py-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
            >
              <LogOut size={24} className="rotate-180" />
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

export default UserSidebar;
