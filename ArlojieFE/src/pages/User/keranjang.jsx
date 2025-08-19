import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import KeranjangArlojie from "../../assets/keranjang/keranjangarlojie.svg";
import Watch1 from "../../assets/Home/jam1.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";

const Keranjang = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Longines Master AC 6570 Silver Stainless Steel Strap",
      price: 4545000,
      quantity: 1,
      image: Watch1, // Changed from "Watch1" to Watch1 (imported image)
    },
  ]);

  const [estimatedShipping] = useState(25000);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Arlojie | Keranjang";
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const grandTotal = subtotal + estimatedShipping;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="relative z-50 bg-black">
        <div
          className="bg-black"
          data-aos="fade-down"
          data-aos-delay="300"
          data-aos-duration="1200"
        >
          <Navbar />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-gray-900 to-black overflow-hidden">
        <img
          src={KeranjangArlojie}
          alt="Arlojie Keranjang"
          className="absolute inset-0 bg-cover bg-center h-64 w-full object-cover opacity-50"
        />
        {/* Content */}
        <div
          className="relative z-10 flex flex-col h-full px-6 justify-center"
          data-aos="fade-right"
          data-aos-delay="300"
          data-aos-duration="1200"
        >
          <h1 className="text-white text-3xl font-bold font-serif mb-2">
            Keranjang Belanja
          </h1>
          <p className="text-white/80 font-sans text-lg">
            Jam Pilihanmu Menanti untuk Dimiliki
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
              <div className="col-span-5">Produk</div>
              <div className="col-span-2 text-center">Harga Satuan</div>
              <div className="col-span-2 text-center">Kuantitas</div>
              <div className="col-span-2 text-center">Total Harga</div>
              <div className="col-span-1 text-center">Aksi</div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="divide-y bg-white">
            {cartItems.map((item) => (
              <div key={item.id} className="px-6 py-6">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="col-span-5 flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center">
                    <span className="text-gray-900 font-medium">
                      Rp{item.price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 text-center min-w-[3rem]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="col-span-2 text-center">
                    <span className="text-gray-900 font-medium">
                      Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-50 px-6 py-6 border-t">
            <div className="flex justify-end">
              <div className="w-80 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>Rp{subtotal.toLocaleString("id-ID")}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-gray-700">
                  <span>Estimasi Ongkir:</span>
                  <span>Rp{estimatedShipping.toLocaleString("id-ID")}</span>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                  <span className="text-lg font-semibold text-gray-900">
                    Grand Total
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    Rp{grandTotal.toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Keranjang;
