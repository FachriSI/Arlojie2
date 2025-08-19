import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "./usersidebar"; // Import UserSidebar

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
      <svg
        className="w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
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

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = (setter) => () => setter((prev) => !prev);
  const close = (setter) => () => setter(false);

  const goToWishlist = () => {
    navigate("/wishlist");
    setMenuOpen(false);
  };

  const goToKeranjang = () => {
    navigate("/keranjang");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    navigate("/login");
    setUserDropdownOpen(false);
  };

  // Handler untuk search enter
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      navigate(`/filter?query=${encodeURIComponent(searchValue.trim())}`);
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
        <div className="text-white text-xl md:text-2xl font-semibold font-serif tracking-wider z-50">
          ARLOJIE
        </div>

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
            <svg
              className="w-6 h-6"
              fill="none"
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
          </IconButton>

          {/* Fixed Cart Icon - Added onClick */}
          <IconButton onClick={goToKeranjang} badge="2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z"
              />
            </svg>
          </IconButton>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={toggle(setUserDropdownOpen)}
              className="text-white hover:text-gray-300 hover:scale-110 transition-all duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
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
                  john.doe@example.com
                </p>
              </div>
              {/* Tambahkan tombol Order Manage */}
              <button
                onClick={() => {
                  navigate("/ordermanage");
                  setUserDropdownOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 text-sm text-black hover:bg-gray-100"
              >
                <svg
                  className="w-4 h-4 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7h18M3 12h18M3 17h18"
                  />
                </svg>
                Order Manage
              </button>
              {/* Tombol Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <svg
                  className="w-4 h-4 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden items-center space-x-3 z-50">
          <IconButton onClick={toggle(setSearchOpen)}>
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </IconButton>

          {/* Fixed Mobile Cart Icon - Added onClick */}
          <IconButton onClick={goToKeranjang} badge="2">
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z"
              />
            </svg>
          </IconButton>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:text-gray-300 focus:outline-none transition-all p-2"
          >
            <div className="w-5 h-5 flex flex-col justify-around">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                    i === 0 && isMenuOpen
                      ? "rotate-45 translate-y-2"
                      : i === 1 && isMenuOpen
                      ? "opacity-0"
                      : i === 2 && isMenuOpen
                      ? "-rotate-45 -translate-y-2"
                      : ""
                  }`}
                />
              ))}
            </div>
          </button>
        </div>
      </nav>
      {/* Render UserSidebar di mobile */}
      {sidebarOpen && <UserSidebar onClose={() => setSidebarOpen(false)} />}
      {/* Dropdown Overlay */}
      {isUserDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={close(setUserDropdownOpen)}
        />
      )}

      {/* Mobile Search */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isSearchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4">
          <SearchInput
            placeholder="Cari Jam Tangan"
            className="focus:ring-2 focus:ring-white/50 shadow-lg"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggle(setMenuOpen)}
      />
    </>
  );
};

export default Navbar;
