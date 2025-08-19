import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS
AOS.init({
  duration: 800,
  once: false, // ✅ Ubah dari true ke false
  offset: 100,
  mirror: true, // ✅ Tambahkan ini untuk animasi ketika scroll kembali
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
