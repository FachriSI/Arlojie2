  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom"; // Tambahkan useParams
  import axios from "axios"; // Tambahkan axios
  import Navbar from "../../components/navbar";
  import Footer from "../../components/footer";
  import ToastNotif from "../../components/toastnotif";

  import Watch1 from "../../assets/Home/jam1.svg";
  import Watch2 from "../../assets/Home/jam2.svg";
  import Watch3 from "../../assets/Home/jam3.svg";
  import Watch4 from "../../assets/Home/jam4.svg";

  export const View = () => {
      const { id } = useParams(); 
      const navigate = useNavigate();

      const [product, setProduct] = useState(null);
      const [recommendations, setRecommendations] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      const [mainImage, setMainImage] = useState('');
      const [quantity, setQuantity] = useState(1);
      const [wishlist, setWishlist] = useState(false);
      const [showToast, setShowToast] = useState(false);

      useEffect(() => {
        const fetchProductData = async () => {
             try {
                 setLoading(true);
                 const [detailResponse, allProductsResponse] = await Promise.all([
                     axios.get(`http://localhost:3000/api/products/${id}`),
                     axios.get(`http://localhost:3000/api/products`)
                 ]);
                 const productData = detailResponse.data;
                 
                 if (productData.images && typeof productData.images === 'string') {
                     productData.images = JSON.parse(productData.images);
                 }
                 setProduct(productData);
                 if (productData.images && productData.images.length > 0) {
                     setMainImage(productData.images[0]);
                 }
                 document.title = `Arlojie | ${productData.name}`;

                 const allProducts = allProductsResponse.data;
                 const filteredRecommendations = allProducts.filter(
                     p => p.id !== parseInt(id, 10)
                 );
                 setRecommendations(filteredRecommendations);
             } catch (err) {
                 console.error("Gagal mengambil data:", err);
                 setError("Produk tidak ditemukan atau terjadi kesalahan.");
             } finally {
                 setLoading(false);
             }
        };

        if (id) {
            window.scrollTo(0, 0);
            fetchProductData();
        }
    }, [id]);


    const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }

  try {
    await axios.post(
      "http://localhost:3000/api/cart",
      {
        productId: product.id, 
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setShowToast({
      show: true,
      message: "Berhasil ditambahkan!",
      type: "success",
    });

    setTimeout(() => {
      setShowToast({ show: false, message: "", type: "" });
      navigate("/keranjang");
    }, 1000);

  } catch (err) {
    console.error("Gagal menambah ke keranjang:", err);
    const errorMessage =
      err.response?.data?.message || "Gagal menambahkan item.";
    setShowToast({ show: true, message: errorMessage, type: "error" });
    setTimeout(() => {
      setShowToast({ show: false, message: "", type: "" });
    }, 3000);
  }
};

    const toggleWishlist = () => {
      setWishlist((prev) => !prev);
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">Memuat data produk...</div>;
    }

    if (error || !product) {
        return <div className="min-h-screen flex justify-center items-center text-red-500">{error || "Produk tidak ditemukan."}</div>;
    }

      return (
          <div className="min-h-screen bg-white">
              {showToast && (
                  <ToastNotif
                      message="Berhasil ditambahkan ke keranjang!"
                      type="success"  
                  />
              )}
              <div className="relative z-50 bg-black">
                  <div className="bg-black">
                      <Navbar />
                  </div>
              </div>

              {/* Breadcrumb Dinamis */}
              <div className="max-w-7xl mx-auto px-4 mt-6 mb-4 text-sm text-black/70">
                  <span onClick={() => navigate('/')} className="hover:underline cursor-pointer">Beranda</span> &gt;{" "}
                  <span className="hover:underline cursor-pointer">{product.category}</span>{" "}
                  &gt; <span className="font-semibold text-black">{product.name}</span>
              </div>

              {/* Main Content */}
              <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8">
                  {/* Gallery Dinamis */}
                  <div className="flex flex-row md:flex-col gap-4">
                      {product.images.map((img, idx) => (
                          <button
                              key={idx}
                              className={`bg-white rounded-xl border p-2 transition-all ${
                                  mainImage === img ? "ring-2 ring-black" : ""
                              }`}
                              onClick={() => setMainImage(img)}
                          >
                              <img
                                  src={`http://localhost:3000${img}`} // Path gambar dari backend
                                  alt={`Produk ${idx + 1}`}
                                  className="w-24 h-24 object-contain"
                              />
                          </button>
                      ))}
                  </div>

                  {/* Main Image Dinamis */}
                  <div className="flex-1 flex justify-center items-center">
                      <div className="bg-white rounded-2xl p-6 flex justify-center items-center shadow-sm w-full">
                          <img
                              src={`http://localhost:3000${mainImage}`} // Path gambar dari backend
                              alt="Main Watch"
                              className="max-h-[350px] object-contain"
                          />
                      </div>
                  </div>
                  
                  {/* Product Info Dinamis */}
                  <div className="flex-1 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                          <span className="text-lg font-medium text-black/70">{product.category}</span>
                          <button onClick={toggleWishlist} className="relative z-20">
                              <svg
                                  className={`w-6 h-6 hover:scale-110 transition-all duration-300 ${
                                      wishlist ? "text-red-500 fill-current" : "text-black hover:text-red-500"
                                  }`}
                                  fill={wishlist ? "currentColor" : "none"}
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                              >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                          </button>
                      </div>
                      <div className="text-2xl font-bold leading-snug">
                          {product.name}
                      </div>
                      <div className="flex items-center gap-4 text-black/70 text-base border-b pb-2">
                          {/* Rating, Penilaian, Terjual bisa ditambahkan ke data produk jika ada */}
                          <span>(4.5)</span>
                          <span>★★★★☆</span>
                          <span>|</span>
                          <span>500+ Terjual</span>
                      </div>
                      <div className="text-3xl font-bold text-black pt-2 pb-4 border-b">
                          {formatRupiah(product.price)}
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border rounded-full overflow-hidden">
                              <button className="px-3 py-1 text-xl" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                              <span className="px-5 py-1 text-lg font-semibold">{quantity}</span>
                              <button className="px-3 py-1 text-xl" onClick={() => setQuantity((q) => q + 1)}>+</button>
                          </div>
                          <span className="text-black/60 ml-2">Tersedia {product.stock}</span>
                      </div>
                      <div className="flex gap-4 mt-4">
                          <button className="flex-1 border border-black rounded-full py-3 font-medium hover:bg-black hover:text-white transition-colors" onClick={() => navigate("/wishlist")}>+ Wishlist</button>
                          <button className="flex-1 bg-black text-white rounded-full py-3 font-medium hover:bg-gray-900 transition-colors" onClick={handleAddToCart}>Tambah ke Keranjang</button>
                      </div>
                      <div className="flex items-center gap-2 mt-6 text-black/80">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v5c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V7l8-4z" /></svg>
                          <span className="font-medium">Garansi Jam Tangan</span>
                          <span className="ml-2">1 bulan</span>
                      </div>
                  </div>
              </div>

              {/* Deskripsi & Spesifikasi Dinamis */}
              <div className="max-w-7xl mx-auto px-4 mt-10">
                  <div className="bg-gray-100 rounded-2xl p-8">
                      <h2 className="text-2xl font-bold text-amber-900 mb-4">Deskripsi Produk</h2>
                      <p className="mb-4 whitespace-pre-wrap">{product.description}</p>
                  </div>
              </div>
      {/* Rekomendasi Produk Serupa (DINAMIS) */}
            <div className="bg-gray-100 py-12 md:py-16 px-4 md:px-16 mt-10">
                <h2 className="text-2xl font-bold mb-8">REKOMENDASI PRODUK SERUPA</h2>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {/* Menggunakan state 'recommendations' untuk me-render */}
                        {recommendations.slice(0, 10).map((recProduct) => ( // Batasi misal 8 rekomendasi
                            <div
                                key={recProduct.id}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center"
                            >
                                <img
                                    src={`http://localhost:3000${JSON.parse(recProduct.images)[0]}`}
                                    alt={recProduct.name}
                                    className="w-32 h-32 object-contain mb-4"
                                />
                                <div className="w-full text-left mb-2">
                                    <div className="font-bold text-sm text-gray-900 truncate">
                                        {recProduct.name}
                                    </div>
                                    <div className="font-semibold text-base text-gray-900 mb-1">
                                        {formatRupiah(recProduct.price)}
                                    </div>
                                    <div className="text-xs text-gray-700 mb-1 truncate">
                                        {recProduct.description}
                                    </div>
                                </div>
                                <button
                                    className="w-full border border-black rounded-full py-2 text-sm hover:bg-black hover:text-white transition-colors mt-auto"
                                    onClick={() => navigate(`/view/${recProduct.id}`)}
                                >
                                    Quick View
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default View;