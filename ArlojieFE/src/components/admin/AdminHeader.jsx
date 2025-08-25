import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHeader({ user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const userName = user?.nama || 'Budiman Saja';
  const userEmail = user?.email || 'admin@arlojie.com';

  const handleLogout = () => {
    // Hapus data pengguna dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");

    // Redirect pengguna ke halaman login
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="flex justify-between items-center bg-black text-white px-6 py-3">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      
      {/* Container untuk profil yang bisa di-klik */}
      <div className="relative">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={toggleDropdown}
        >
          <div className="text-right">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-300">{userEmail}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-black font-bold">
            {userName.charAt(0).toUpperCase()}
            </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute top-12 right-0 w-48 bg-white text-black rounded-lg shadow-lg py-2 z-10">
            <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 **text-red-500**"
          >
            Logout
          </button>
          </div>
        )}
      </div>
    </header>
  );
}