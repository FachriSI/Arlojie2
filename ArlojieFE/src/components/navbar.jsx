import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserSidebar from "../components/usersidebar"; // Import UserSidebar
import {
  LogIn,
  User,
  ShoppingCart,
  Heart,
  Search,
  X,
  LayoutDashboard,
} from "lucide-react"; // Import ikon dari lucide-react

const IconButton = ({ onClick, children, badge }) => (
  <button
    onClick={onClick}
    className="text-white hover:text-gray-300 hover:scale-110 transition-all duration-300 relative group"
  >
    {children}
    {badge && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {badge}
      </span>
    )}
  </button>
);

const SearchInput = ({
  placeholder,
  className,
  value,
  onChange,
  onKeyDown,
}) => (
  <div className="relative w-full">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search className="w-5 h-5 text-gray-500" />{" "}
      {/* Menggunakan ikon Search dari lucide-react */}
    </div>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`w-full bg-white rounded-full py-3 pl-12 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none ${className}`}
    />
  </div>
);

// Menerima userData dan handleLogout sebagai props
export const Navbar = ({ userData, handleLogout }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Untuk mobile sidebar
  const navigate = useNavigate();

  const toggle = (setter) => () => setter((prev) => !prev);
  const close = (setter) => () => setter(false);

  const goToWishlist = () => {
    navigate("/wishlist");
    setMenuOpen(false); // Tutup menu mobile jika terbuka
  };

  const goToKeranjang = () => {
    navigate("/keranjang");
    setMenuOpen(false); // Tutup menu mobile jika terbuka
  };

  // Handler untuk search enter
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      navigate(`/filter?query=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false); // Tutup search bar mobile setelah search
    }
  };

  return (
    <>
      <nav
        className="flex items-center justify-between px-6 md:px-16 py-4 md:py-6 relative"
        data-aos="fade-down"
        data-aos-delay="300"
        data-aos-duration="1200"
      >
        <Link
          to="/home"
          className="text-white text-xl md:text-2xl font-semibold font-serif tracking-wider z-50"
        >
          ARLOJIE
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <SearchInput
            placeholder="Cari Jam Tangan"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <IconButton onClick={goToWishlist} badge="3">
            <Heart size={24} /> {/* Menggunakan ikon Heart dari lucide-react */}
          </IconButton>

          <IconButton onClick={goToKeranjang} badge="2">
            <ShoppingCart size={24} />{" "}
            {/* Menggunakan ikon ShoppingCart dari lucide-react */}
          </IconButton>

          {/* User Dropdown / Login Button */}
          <div className="relative">
            {userData && userData.isLoggedIn ? (
              // Jika user sudah login
              <>
                <button
                  onClick={toggle(setUserDropdownOpen)}
                  className="text-white hover:text-gray-300 hover:scale-110 transition-all duration-300"
                >
                  <User size={24} />{" "}
                  {/* Menggunakan ikon User dari lucide-react */}
                </button>
                <div
                  className={`absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 z-50 transform transition-all duration-300 origin-top-right ${
                    isUserDropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm text-gray-600">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {userData.email} {/* Menampilkan email dari userData */}
                    </p>
                  </div>
                  {/* Tampilkan tombol Order Manage jika role adalah 'admin' */}
                  {userData.role === "admin" && (
                    <button
                      onClick={() => {
                        navigate("/admin/orders"); // Ganti dengan rute yang sesuai untuk admin
                        setUserDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-sm text-black hover:bg-gray-100"
                    >
                      <LayoutDashboard size={16} className="mr-3" />{" "}
                      {/* Ikon Order Manage */}
                      Order Manage
                    </button>
                  )}
                  {/* Tombol Logout */}
                  <button
                    onClick={() => {
                      handleLogout(); // Memanggil handleLogout dari props
                      setUserDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogIn size={16} className="rotate-180 mr-3" />{" "}
                    {/* Ikon Logout (Login terbalik) */}
                    Logout
                  </button>
                </div>
              </>
            ) : (
              // Jika user belum login
              <Link
                to="/login"
                className="text-white hover:text-gray-300 hover:scale-110 transition-all duration-300"
              >
                <LogIn size={24} />{" "}
                {/* Menggunakan ikon LogIn dari lucide-react */}
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden items-center space-x-3 z-50">
          <IconButton onClick={toggle(setSearchOpen)}>
            <Search size={20} />{" "}
            {/* Menggunakan ikon Search dari lucide-react */}
          </IconButton>

          <IconButton onClick={goToKeranjang} badge="2">
            <ShoppingCart size={20} />{" "}
            {/* Menggunakan ikon ShoppingCart dari lucide-react */}
          </IconButton>

          {/* Mobile User Icon / Login Button */}
          {userData && userData.isLoggedIn && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white hover:text-gray-300 focus:outline-none transition-all p-2"
            >
              <User size={20} />
            </button>
          )}

          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={toggle(setMenuOpen)}
            className="text-white hover:text-gray-300 focus:outline-none transition-all p-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Render UserSidebar di mobile - Buka jika sidebarOpen true */}
      {sidebarOpen && userData && userData.isLoggedIn && (
        <UserSidebar
          userData={userData}
          handleLogout={handleLogout}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* Dropdown Overlay (untuk Desktop User Dropdown) */}
      {isUserDropdownOpen && (
        <div
          className=" inset-0 z-100"
          onClick={close(setUserDropdownOpen)}
        />
      )}

      {/* Mobile Search Overlay (muncul dari atas) */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full bg-black/90 backdrop-blur-md z-40 transition-all duration-300 ease-in-out ${
          isSearchOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <SearchInput
            placeholder="Cari Jam Tangan..."
            className="flex-1 mr-4"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <button onClick={close(setSearchOpen)} className="text-white">
            <X size={24} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <UserSidebar
          userData={userData}
          handleLogout={handleLogout}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
