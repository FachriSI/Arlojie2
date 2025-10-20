import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import ArlojieFilter from "../../assets/filter/arlojiefilter.svg";
const Filter = () => {
  useEffect(() => {
    document.title = "Arlojie | Filter";
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [rating, setRating] = useState(0);
  const [filterType, setFilterType] = useState("Terbaru");
  const [searchQuery] = useState("Jam Tangan Longines");
  const [wishlistItems, setWishlistItems] = useState(new Set());

  const categories = [
    { id: "jam-tangan-pria", label: "Jam Tangan Pria" },
    { id: "jam-tangan-wanita", label: "Jam Tangan Wanita" },
    { id: "jam-tangan-anak", label: "Jam Tangan Anak" },
  ];

  const brands = ["LONGINES", "CASIO", "SEIKO", "ROLEX", "OMEGA"];

  const filterTypes = [
    "Urutan",
    "Terbaru",
    "Termurah",
    "Termahal",
    "Rating Tertinggi",
  ];

  const ratings = [5, 4, 3, 2, 1];

  const handleResetFilter = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceRange([0, 10000000]);
    setRating(0);
    setFilterType("Terbaru");
  };

  // Sample products data
  const products = [
    {
      id: 1,
      name: "LONGINES MASTER",
      price: 4545000,
      rating: 4.8,
      reviews: 18,
      image: "/api/placeholder/200/200",
      brand: "LONGINES",
      category: "Automatic Watch",
      subcategory: "Stainless Steel Strap",
    },
    {
      id: 2,
      name: "LONGINES MASTER",
      price: 4545000,
      rating: 4.8,
      reviews: 18,
      image: "/api/placeholder/200/200",
      brand: "LONGINES",
      category: "Automatic Watch",
      subcategory: "Stainless Steel Strap",
    },
    // Add more products as needed...
  ];

  const toggleWishlist = (productId) => {
    setWishlistItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  // Custom SVG Icons
  const FunnelIcon = () => (
    <svg
      className="h-5 w-5 text-gray-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );

  const LocationIcon = () => (
    <svg
      className="h-4 w-4 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <div
        className="relative z-50 "
        data-aos="fade-down"
        data-aos-delay="300"
        data-aos-duration="1200"
      >
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <img
          src={ArlojieFilter}
          alt="Arlojie view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex items-center h-full px-6">
          <h1 className="text-white text-3xl font-sans font-bold mb-4">
            Jam Tangan Terbaik Hanya Untukmu
          </h1>
        </div>
      </div>

      <div className="flex gap-6 p-6 bg-white">
        {/* Sidebar Filter */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white p-6 sticky top-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FunnelIcon />
                <h2 className="text-lg font-semibold text-gray-800">FILTER</h2>
              </div>
              <button
                onClick={handleResetFilter}
                className="text-sm text-black underline font-medium"
              >
                Reset Filter
              </button>
            </div>

            {/* Search Results Info */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <LocationIcon />
                <span className="text-sm font-medium text-gray-700">
                  Hasil pencarian untuk "{searchQuery}"
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">50 Hasil Pencarian</p>

              {/* Filter Type Buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                {filterTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filterType === type
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Kategori
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-black border-gray-300 rounded cursor-pointer focus:ring-black"
                      checked={selectedCategory === category.id}
                      onChange={(e) =>
                        setSelectedCategory(e.target.checked ? category.id : "")
                      }
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {category.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ratings */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Penilaian
              </h3>
              <div className="space-y-2">
                {ratings.map((ratingValue) => (
                  <label
                    key={ratingValue}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rating"
                      className="h-4 w-4 text-black border-gray-300 cursor-pointer focus:ring-black"
                      checked={rating === ratingValue}
                      onChange={() => setRating(ratingValue)}
                    />
                    <div className="ml-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < ratingValue
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-600">
                        & up ({ratingValue}.0)
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Rentang Harga
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Rp 8.000.000</span>
                  <span>sampai</span>
                  <span>Rp 200.000.000</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="8000000"
                    max="200000000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-6 cursor-pointer">
            {Array.from({ length: 20 }, (_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow group"
              >
                {/* Product Image */}
                <div className="w-full h-48 rounded-lg mb-4 relative overflow-hidden">
                  <img
                    src="/api/placeholder/200/200"
                    alt="Watch"
                    className="w-full h-full object-cover"
                  />

                  {/* Heart Icon - Add to Wishlist */}
                  <button
                    onClick={() => toggleWishlist(index)}
                    className="absolute top-4 right-4 z-20"
                  >
                    <svg
                      className={`w-6 h-6 hover:scale-110 transition-all duration-300 ${
                        wishlistItems.has(index)
                          ? "text-red-500 fill-current"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                      fill={wishlistItems.has(index) ? "currentColor" : "none"}
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

                {/* Product Info */}
                <div className="space-y-2 text-center">
                  <h3 className="font-semibold text-sm text-gray-800">
                    LONGINES MASTER
                  </h3>
                  <p className="text-xs text-gray-600">Automatic Watch</p>
                  <p className="text-xs text-gray-600">Stainless Steel Strap</p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-3 w-3 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-600">(4.8)</span>
                  </div>

                  <p className="font-bold text-lg text-gray-800">
                    Rp 4.545.000
                  </p>

                  <div className="flex justify-center">
                    <button className="px-2 md:px-6 py-2 border text-black border-gray-900 text-xs md:text-sm rounded-lg hover:bg-gray-900 hover:text-white hover:scale-105 transition-all duration-300 bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="bg-white border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Lihat Hasil Lainnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
