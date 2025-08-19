import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Arlojie = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      delay: 100,
    });
  }, []);

  return (
    <div className="min-h-screen w-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        src="/Arlojie Start.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40" />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        {/* Brand Logo */}
        <h1
          className="text-6xl font-semibold font-serif mb-4 text-center bg-gradient-to-b from-black  to-white bg-clip-text text-transparent"
          data-aos="fade-down"
          data-aos-delay="300"
          data-aos-duration="1200"
        >
          Arlojie
        </h1>

        {/* Tagline */}
        <p
          className="text-white text-lg font-light italic mb-16 tracking-wider"
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="1000"
        >
          The Art of Timekeeping
        </p>

        {/* Get Started Button */}
        <button
          onClick={() => navigate("/login")}
          className="font-serif border border-white/60 text-white px-8 py-3 tracking-wide text-lg rounded-full hover:bg-white hover:scale-105  hover:text-black transition duration-300"
          data-aos="zoom-in"
          data-aos-delay="900"
          data-aos-duration="800"
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "none";
          }}
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default Arlojie;
