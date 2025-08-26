import React, { useState, useEffect } from "react";
import Usersidebar from "../../components/usersidebar";
import Navbar from "../../components/navbar";
import KeranjangArlojie from "../../assets/keranjang/keranjangarlojie.svg";
import Watch1 from "../../assets/Home/jam1.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Alamat from "../../components/alamat";

const Keranjang = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Longines Master AC 6570 Silver Stainless Steel Strap",
      price: 4545000,
      quantity: 1,
      image: Watch1,
      description: "Stainless Steel Strap", // Tambahkan deskripsi agar tidak error
    },
  ]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [estimatedShipping] = useState(25000);
  const navigate = useNavigate();
  const [showAlamatForm, setShowAlamatForm] = useState(false);

  // State untuk userData dan handleLogout
  const [userData, setUserData] = useState(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setUserData({ isLoggedIn: false });
    navigate("/login");
  };

  useEffect(() => {
    document.title = "Arlojie | Keranjang";
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUserData({
        isLoggedIn: true,
        name: localStorage.getItem("userName"),
        email: localStorage.getItem("userEmail"),
        role: localStorage.getItem("role"),
        // ...
      });
    } else {
      setUserData({ isLoggedIn: false });
    }
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

  const handleAlamatSubmit = (data) => {
    setShowAlamatForm(false);
    navigate("/checkout", {
      state: { alamat: data, cartItems: cartItems, grandTotal: grandTotal },
    });
  };

  return (
    <div className="min-h-screen bg-white relative">
      {showSidebar && (
        <div className="fixed inset-0 z-[999] flex">
          <div
            className="w-[350px] max-w-full h-full bg-gray-200 bg-opacity-80 backdrop-blur-lg shadow-xl p-8 flex flex-col"
            style={{ animation: "slideInLeft 0.3s" }}
          >
            <Usersidebar
              userData={userData}
              handleLogout={handleLogout}
              onClose={() => setShowSidebar(false)}
            />
            <button
              className="absolute top-8 right-8 text-2xl font-bold"
              onClick={() => setShowSidebar(false)}
            >
              &times;
            </button>
          </div>
          <div className="flex-1" onClick={() => setShowSidebar(false)} />
        </div>
      )}
      {showAlamatForm && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative">
            <Alamat
              onSubmit={handleAlamatSubmit}
              onCancel={() => setShowAlamatForm(false)}
            />
          </div>
        </div>
      )}
      <div className="relative z-50 bg-black">
        <Navbar userData={userData} handleLogout={handleLogout} />
      </div>
      <div className="relative h-64 bg-gradient-to-r from-gray-900 to-black overflow-hidden">
        <img
          src={KeranjangArlojie}
          alt="Arlojie Keranjang"
          className="absolute inset-0 bg-cover bg-center h-64 w-full object-cover opacity-50"
        />
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
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
              <div className="col-span-5">Produk</div>
              <div className="col-span-2 text-center">Harga Satuan</div>
              <div className="col-span-2 text-center">Kuantitas</div>
              <div className="col-span-2 text-center">Total Harga</div>
              <div className="col-span-1 text-center">Aksi</div>
            </div>
          </div>
          <div className="divide-y bg-white">
            {cartItems.map((item) => (
              <div key={item.id} className="px-6 py-6">
                <div className="grid grid-cols-12 gap-4 items-center">
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
                  <div className="col-span-2 text-center">
                    <span className="text-gray-900 font-medium">
                      Rp{item.price.toLocaleString("id-ID")}
                    </span>
                  </div>
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
                  <div className="col-span-2 text-center">
                    <span className="text-gray-900 font-medium">
                      Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
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
          <div className="bg-gray-50 px-6 py-6 border-t">
            <div className="flex justify-end">
              <div className="w-80 space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>Rp{subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Estimasi Ongkir:</span>
                  <span>Rp{estimatedShipping.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                  <span className="text-lg font-semibold text-gray-900">
                    Grand Total
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    Rp{grandTotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <button
                  className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  onClick={() => setShowAlamatForm(true)}
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
