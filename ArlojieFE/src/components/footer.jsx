import React from "react";
import Whatsapp from "../assets/footer/whatsapp.svg";
import Instagram from "../assets/footer/instagram.svg";
const Footer = () => (
  <footer className="bg-black">
    <div className="bg-gray-100 px-8 py-12 flex flex-col md:flex-row md:justify-between md:items-start">
      {/* Brand */}
      <div className="mb-10 md:mb-0">
        <div className="text-3xl font-bold font-serif mb-8">ARLOJIE</div>
        <div className="tracking-widest font-bold text-lg mb-2">YOUR TIME</div>
        <div className="tracking-widest font-semibold text-lg">
          YOUR SIGNATURE
        </div>
      </div>
      {/* Quick Links */}
      <div className="mb-10 md:mb-0">
        <div className="font-semibold mb-3 text-lg">Quick Links</div>
        <ul className="space-y-2 text-base">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/produk" className="hover:underline">
              Produk
            </a>
          </li>
          <li>
            <a href="/keranjang" className="hover:underline">
              Keranjang Belanja
            </a>
          </li>
          <li>
            <a href="/ordermanage" className="hover:underline">
              Riwayat Belanja
            </a>
          </li>
        </ul>
      </div>
      {/* Sosial Media */}
      <div>
        <div className="font-semibold mb-3 text-lg">Our Social Media</div>
        <div className="flex gap-6 mt-2">
          {/* Instagram */}
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img src={Instagram} alt="Instagram" className="w-8 h-8" />
          </a>
          {/* WhatsApp */}
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <img src={Whatsapp} alt="WhatsApp" className="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
    <div className="bg-black text-white text-center py-4 text-base">
      ©2025 ARLOJIE. All Rights Reserved
    </div>
  </footer>
);

export default Footer;
