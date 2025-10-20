import React, { useState, useEffect } from "react";
import axios from "axios";
import Arlojieview from "../../assets/Home/viewarlojie.svg";
import ArlojieVideo from "../../assets/Home/arlojiehome.mp4";
import Navbar from "../../components/navbar";
import ArlojieVideo1 from "../../assets/Home/arlojiehome1.mp4";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]); // State untuk produk dari DB
    const [,setLoading] = useState(true);

    useEffect(() => {
        document.title = "Arlojie | Home";

        // Ambil data pengguna dari localStorage
        const storedName = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("userEmail");
        const storedRole = localStorage.getItem("role");
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setUserData({
                name: storedName,
                email: storedEmail,
                role: storedRole,
                isLoggedIn: true,
            });
        } else {
            setUserData({ isLoggedIn: false });
        }

        // Ambil data produk dari backend
        axios
            .get("http://localhost:3000/api/products") // Pastikan port 3000 atau sesuai backend Anda
            .then((res) => {
                setProducts(res.data); // Isi state 'products' dengan data dari DB
            })
            .catch((err) => console.error("Error fetching products:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        setUserData({ isLoggedIn: false });
        navigate("/login");
    };

    // Quotes
    const quotes = [
        {
            text: "Time is free, but it's priceless. You can't own it, but you can use it. You can't keep it, but you can spend it. Once you've lost it, you can never get it back.",
            author: "Harvey Mackay",
        },
        {
            text: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away. Just like time, elegance lives in precision, in subtlety — not in extravagance. The finest things are often the quietest.",
            author: " Antoine de Saint-Exupéry",
        },
        {
            text: "In a world addicted to speed, slowness is a superpower. Taking time to appreciate each tick of the clock, each detail of craftsmanship — that's where true luxury lives. Not in the rush, but in the richness of the moment.",
            author: "Carl Honoré",
        },
        {
            text: "Elegance is a whole: the way you walk, the way you talk, the way you move — and even the way you check the time. True elegance whispers, never shouts. It lives in simplicity, precision, and grace.",
            author: "Christian Dior",
        },
    ];

    const [currentQuote, setCurrentQuote] = useState(0);
    const [wishlistItems, setWishlistItems] = useState(new Set());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [quotes.length]);

    const toggleWishlist = (id) => {
        setWishlistItems((prev) => {
            const newSet = new Set(prev);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            return newSet;
        });
    };

    // Helper untuk memformat harga
    const formatRupiah = (number) => {
        if (isNaN(number)) {
            return "Rp 0";
        }
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // Safe image URL builder: handles JSON string or array and provides a fallback
    const getImageSrc = (product) => {
        try {
            const imgs = product?.images;
            if (!imgs) return '/vite.svg';
            // if stored as JSON string, parse it
            const arr = typeof imgs === 'string' ? JSON.parse(imgs) : imgs;
            if (!Array.isArray(arr) || arr.length === 0) return '/vite.svg';
            const first = arr[0];
            if (!first) return '/vite.svg';
            // if already a full URL, return as-is
            if (String(first).startsWith('http')) return first;
            // if relative path (starts with '/'), prefix backend host
            if (String(first).startsWith('/')) return `http://localhost:3000${first}`;
            // otherwise, assume it's a filename under uploads/products
            return `http://localhost:3000/uploads/products/${first}`;
        } catch {
            return '/vite.svg';
        }
    };


    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative min-h-screen bg-gradient-to-r from-gray-900 to-black overflow-hidden">
                <img
                    src={Arlojieview}
                    alt="Arlojie view"
                    className="absolute top-0 right-0 w-auto h-full object-cover object-center md:object-left opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 md:from-black/80 via-black/70 md:via-black/50 to-black/50 md:to-transparent"></div>
                <div
                    className="absolute top-0 left-0 w-full z-30"
                    data-aos="fade-down"
                    data-aos-delay="300"
                    data-aos-duration="1200"
                >
                    <Navbar userData={userData} handleLogout={handleLogout} />
                </div>
                <div className="relative z-10 flex flex-col justify-center md:justify-end h-screen px-6 md:px-12 max-w-full md:max-w-2xl pb-16 md:pb-32">
                    <h1
                        className="text-white text-3xl md:text-5xl font-bold font-['Plus_Jakarta_Sans'] tracking-wide leading-tight text-center md:text-left"
                        data-aos="fade-right"
                        data-aos-delay="600"
                        data-aos-duration="800"
                    >
                        YOUR TIME
                        <br />
                        <span className="font-light tracking-wider">YOUR SIGNATURE</span>
                    </h1>
                </div>
            </div>

            {/* Quote Section */}
            <div
                className="relative py-12 md:py-20 px-6 md:px-16 overflow-hidden"
                data-aos="zoom-in"
                data-aos-delay="600"
                data-aos-duration="1800"
                data-aos-easing="ease-out-quart"
            >
                <div className="max-w-4xl mx-auto">
                    <div className="relative h-40 md:h-32">
                        {quotes.map((quote, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${index === currentQuote
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                    }`}
                            >
                                <div className="text-center">
                                    <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-6 md:mb-8 min-h-[80px] md:min-h-[80px] flex items-center justify-center px-4">
                                        "{quote.text}"
                                    </p>
                                    <p className="text-gray-600 text-sm font-medium">
                                        — {quote.author}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-1 mt-6">
                        <div
                            className="bg-gray-800 h-1 rounded-full transition-all duration-300 ease-linear"
                            style={{
                                width: `${((currentQuote + 1) / quotes.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Second Hero Section */}
            <div className="relative h-64 md:h-96 bg-gray-900 overflow-hidden">
                <video
                    src={ArlojieVideo1}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center px-6">
                    <div className="text-center text-white">
                        <h3
                            className="text-2xl md:text-4xl font-bold font-serif italic mb-2 md:mb-4"
                            data-aos="fade-up"
                            data-aos-delay="600"
                            data-aos-duration="1200"
                        >
                            PRECISION IN MOTION
                        </h3>
                        <p
                            className="text-base md:text-lg font-sans italic"
                            data-aos="fade-up"
                            data-aos-delay="800"
                            data-aos-duration="1200"
                        >
                            Experience the art of timekeeping
                        </p>
                    </div>
                </div>
            </div>

            {/* Crafted Section */}
            <div className="bg-white py-12 md:py-20 px-6 md:px-16">
                <div
                    className="max-w-6xl mx-auto"
                    data-aos="fade-down"
                    data-aos-delay="700"
                    data-aos-duration="1200"
                >
                    <h2 className="text-2xl md:text-4xl font-bold font-serif text-center text-gray-900 mb-4">
                        CRAFTED TO BE NOTICED
                    </h2>
                    <p className="text-center text-gray-600 font-sans mb-12 md:mb-16 max-w-2xl mx-auto text-sm md:text-base px-4">
                        Setiap jam dibuat dengan ketelitian dan cita rasa tinggi, agar Anda
                        selalu tampil berkelas dan percaya diri.
                    </p>

                    {/* PERBAIKAN 1: Menggunakan `products` state, bukan `watchesData` */}
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16"
                        data-aos="zoom-in"
                        data-aos-duration="1200"
                    >
                        {products.slice(0, 4).map((product, index) => (
                            <div
                                key={product.id}
                                className="text-center bg-gray-100 rounded-lg px-4 py-6 md:py-8 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group relative"
                                data-aos-delay={700 + index * 150}
                            >
                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className="absolute top-4 right-4 z-20"
                                >
                                    <svg
                                        className={`w-6 h-6 hover:scale-110 transition-all duration-300 ${wishlistItems.has(product.id)
                                                ? "text-red-500 fill-current"
                                                : "text-gray-400 hover:text-red-500"
                                            }`}
                                        fill={wishlistItems.has(product.id) ? "currentColor" : "none"}
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
                                <div className="mb-4 md:mb-6">
                                    {/* Menampilkan gambar dari path yang benar */}
                                    <img
                                        src={getImageSrc(product)}
                                        alt={product.name}
                                        className="w-full h-40 md:h-48 object-contain"
                                    />
                                </div>
                                <div className="space-y-2 md:space-y-3">
                                    <h3 className="font-semibold text-sm md:text-sm">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-gray-600">{product.description}</p>
                                    <p className="font-bold text-sm">{formatRupiah(product.price)}</p>
                                    <div className="flex justify-center">
                                        {/* Logika rating bisa ditambahkan di sini jika ada di data produk */}
                                    </div>
                                    <button
                                        className="px-4 md:px-6 py-2 border text-black border-gray-900 text-xs md:text-sm rounded-lg hover:bg-gray-900 hover:text-white hover:scale-105 transition-all duration-300 bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0"
                                        onClick={() => navigate(`/view/${product.id}`)}
                                    >
                                        Quick View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* PERBAIKAN 2: Menggunakan `products` state, bukan `watchesData` */}
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                        data-aos="zoom-in"
                        data-aos-duration="1200"
                    >
                        {products.slice(4, 8).map((product, index) => (
                            <div
                                key={product.id}
                                className="text-center bg-gray-100 rounded-lg px-4 py-6 md:py-8 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group relative"
                                data-aos-delay={700 + index * 150}
                            >
                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className="absolute top-4 right-4 z-20"
                                >
                                     <svg
                                        className={`w-6 h-6 hover:scale-110 transition-all duration-300 ${wishlistItems.has(product.id)
                                                ? "text-red-500 fill-current"
                                                : "text-gray-400 hover:text-red-500"
                                            }`}
                                        fill={wishlistItems.has(product.id) ? "currentColor" : "none"}
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
                                <div className="mb-4 md:mb-6">
                                    <img
                                        src={getImageSrc(product)}
                                        alt={product.name}
                                        className="w-full h-40 md:h-48 object-contain"
                                    />
                                </div>
                                <div className="space-y-2 md:space-y-3">
                                    <h3 className="font-semibold text-sm">{product.name}</h3>
                                    <p className="text-xs text-gray-600">{product.description}</p>
                                    <p className="font-bold text-sm">{formatRupiah(product.price)}</p>
                                    <div className="flex justify-center">
                                        {/* Logika rating bisa ditambahkan di sini jika ada di data produk */}
                                    </div>
                                    <button
                                        className="px-4 md:px-6 py-2 border text-black border-gray-900 text-xs md:text-sm rounded-lg hover:bg-gray-900 hover:text-white hover:scale-105 transition-all duration-300 bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0"
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        Quick View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Exclusive Section */}
            <div className="bg-gray-50 py-12 md:py-20 px-6 md:px-16">
                <div className="max-w-6xl mx-auto">
                    <div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center"
                        data-aos="fade-down"
                        data-aos-delay="700"
                        data-aos-duration="1200"
                    >
                        <div className="order-2 lg:order-1">
                            <h2 className="text-2xl md:text-4xl font-bold font-serif text-gray-900 mb-4 md:mb-6 text-center lg:text-left">
                                EXCLUSIVE, ONLY FOR YOU
                            </h2>
                            <p className="text-gray-700 text-base md:text-lg font-sans leading-relaxed mb-6 md:mb-8 text-center lg:text-left">
                                Arlojie adalah lebih dari sekadar penunjuk waktu — ia adalah
                                simbol kepercayaan diri. Dengan desain elegan dan kualitas yang
                                timeless, Arlojie menjadikan setiap detik sebagai pernyataan
                                gaya. Waktunya melangkah dengan kelas. Waktunya Arlojie.
                            </p>
                            <div className="text-center lg:text-left">
                                <button className="bg-black text-white px-6 md:px-8 py-2 md:py-3 rounded hover:bg-gray-800 transition-colors text-sm md:text-base">
                                    Beli Sekarang
                                </button>
                            </div>
                        </div>
                        <div
                            className="bg-black rounded-lg overflow-hidden order-1 lg:order-2"
                            data-aos="fade-down"
                            data-aos-delay="500"
                            data-aos-duration="1200"
                        >
                            <video
                                src={ArlojieVideo}
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-64 md:h-96 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;