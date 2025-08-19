import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini
import Navbar from "../../components/navbar";
import WishlistArlojie from "../../assets/wishlist/jamwishlist.svg";
import Footer from "../../components/footer";
import Watch1 from "../../assets/Home/jam1.svg";
import Watch2 from "../../assets/Home/jam2.svg";
import Watch3 from "../../assets/Home/jam3.svg";
import Watch4 from "../../assets/Home/jam4.svg";
import Watch5 from "../../assets/Home/jam5.svg";
import Watch6 from "../../assets/Home/jam6.svg";
import Watch7 from "../../assets/Home/jam2.svg";
import Watch8 from "../../assets/Home/jam5.svg";

// Sample watch data
const wishlistData = [
  {
    id: 1,
    name: "LONGINES MASTER",
    description: "Automatic Watch Stainless Steel Strap",
    price: "Rp 4.545.000",
    rating: 4.9,
    image: Watch1,
  },
  {
    id: 2,
    name: "OMEGA SPEEDMASTER",
    description: "Chronograph Leather Strap",
    price: "Rp 6.750.000",
    rating: 4.8,
    image: Watch2,
  },
  {
    id: 3,
    name: "ROLEX SUBMARINER",
    description: "Diving Watch Steel Bracelet",
    price: "Rp 12.500.000",
    rating: 5.0,
    image: Watch3,
  },
  {
    id: 4,
    name: "TAG HEUER CARRERA",
    description: "Racing Watch Carbon Fiber",
    price: "Rp 8.200.000",
    rating: 4.7,
    image: Watch4,
  },
  {
    id: 5,
    name: "BREITLING NAVITIMER",
    description: "Pilot Watch Steel Mesh",
    price: "Rp 9.800.000",
    rating: 4.6,
    image: Watch5,
  },
  {
    id: 6,
    name: "SEIKO PROSPEX",
    description: "Diver Watch Rubber Strap",
    price: "Rp 3.250.000",
    rating: 4.5,
    image: Watch6,
  },
  {
    id: 7,
    name: "TISSOT PRC 200",
    description: "Sport Watch Steel Bracelet",
    price: "Rp 2.890.000",
    rating: 4.4,
    image: Watch7,
  },
  {
    id: 8,
    name: "CASIO G-SHOCK",
    description: "Digital Watch Resin Strap",
    price: "Rp 1.750.000",
    rating: 4.3,
    image: Watch8,
  },
];

export const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(wishlistData);
  const [wishlistState, setWishlistState] = useState(
    new Set(wishlistData.map((item) => item.id))
  );
  const navigate = useNavigate(); // Tambahkan ini

  useEffect(() => {
    document.title = "Arlojie | Wishlist";
  }, []);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    setWishlistState((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <div
        className="relative z-50"
        data-aos="fade-down"
        data-aos-delay="300"
        data-aos-duration="1200"
      >
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-gray-900 to-black overflow-hidden">
        {/* Background Image - Responsive */}
        <img
          src={WishlistArlojie}
          alt="Arlojie view"
          className="absolute top-0 right-0 w-auto h-full object-cover object-center md:object-left opacity-80"
        />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16"
          data-aos="fade-right"
          data-aos-delay="300"
          data-aos-duration="1200"
        >
          <h1 className="text-white text-3xl md:text-4xl font-bold font-serif mb-2">
            Wishlist
          </h1>
          <p className="text-white/80 font-sans text-lg">
            Model Jam Terfavoritmu
          </p>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="bg-gray-50 py-12 md:py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            data-aos="fade-down"
            data-aos-delay="300"
            data-aos-duration="1200"
          >
            {wishlistItems.map((watch) => (
              <div
                key={watch.id}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative group cursor-pointer"
              >
                {/* Heart Icon - Remove from Wishlist */}
                <button
                  onClick={() => removeFromWishlist(watch.id)}
                  className="absolute top-4 right-4 z-20"
                >
                  <svg
                    className={`w-6 h-6 hover:scale-110 transition-all duration-300 ${
                      wishlistState.has(watch.id)
                        ? "text-red-500 fill-current"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                    fill={wishlistState.has(watch.id) ? "currentColor" : "none"}
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

                {/* Watch Image */}
                <div className="mb-4">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="w-full h-48 object-contain"
                  />
                </div>

                {/* Watch Details */}
                <div className="text-center space-y-2">
                  <h3 className="font-bold text-sm text-gray-900">
                    {watch.name}
                  </h3>
                  <p className="text-xs text-gray-600">{watch.description}</p>
                  <p className="font-bold text-sm text-gray-900">
                    {watch.price}
                  </p>

                  {/* Star Rating */}
                  <div className="flex justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-xs ${
                          star <= Math.floor(watch.rating)
                            ? "text-black"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      ({watch.rating})
                    </span>
                  </div>

                  {/* Quick View Button */}
                  <button
                    className="px-4 md:px-6 py-2 border text-black border-gray-900 text-xs md:text-sm rounded-lg hover:bg-gray-900 hover:text-white hover:scale-105 transition-all duration-300 bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0"
                    onClick={() => navigate("/view")}
                  >
                    Quick View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {wishlistItems.length === 0 && (
            <div className="text-center py-20">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wishlist Kosong
              </h3>
              <p className="text-gray-600 mb-6">
                Belum ada jam tangan yang ditambahkan ke wishlist
              </p>
              <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Jelajahi Koleksi
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
