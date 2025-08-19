import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";

const NotFound = () => {
  const navigate = useNavigate();

  // Data quotes
  const quotes = [
    {
      text: "Time stays long enough for anyone who will use it.",
      author: "Leonardo da Vinci",
    },
    {
      text: "The future is something which everyone reaches at the rate of sixty minutes an hour, whatever he does, whoever he is.",
      author: "C.S. Lewis",
    },
    {
      text: "Yesterday is gone. Tomorrow has not yet come. We have only today. Let us begin.",
      author: "Mother Teresa",
    },
    {
      text: "Time is a created thing. To say 'I don't have time' is to say 'I don't want to'.",
      author: "Lao Tzu",
    },
    {
      text: "The two most powerful warriors are patience and time.",
      author: "Leo Tolstoy",
    },
    {
      text: "Time you enjoy wasting is not wasted time.",
      author: "Bertrand Russell",
    },
    {
      text: "They always say time changes things, but you actually have to change them yourself.",
      author: "Andy Warhol",
    },
    {
      text: "Time is the wisest counselor of all.",
      author: "Pericles",
    },
  ];

  // State untuk current quote index
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    document.title = "Arlojie | Not Found";
    AOS.refresh();
  }, []);

  // Auto slide effect untuk quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000); // Ganti setiap 4 detik

    return () => clearInterval(interval);
  }, [quotes.length]);

  const handleGoBack = () => {
    navigate("/"); // ✅ Kembali ke Arlojie.jsx (root path)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative overflow-hidden">
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
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Error Message */}
        <div
          className="mb-8"
          data-aos="fade-up"
          data-aos-delay="800"
          data-aos-duration="1000"
        >
          <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
            Oops! Time seems to have stopped...
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            The page you're looking for has vanished like time itself. But don't
            worry, every second is precious — let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          data-aos="fade-up"
          data-aos-delay="1000"
          data-aos-duration="800"
        >
          <button
            onClick={handleGoBack}
            className="px-8 py-3 border-2 border-white/60 text-white font-semibold font-sans rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
          >
            Return
          </button>
        </div>

        {/* Quote Carousel Section */}
        <div
          className="pt-8 border-t border-white/20"
          data-aos="fade-up"
          data-aos-delay="1200"
          data-aos-duration="800"
        >
          {/* Quote Container */}
          <div className="relative h-32 max-w-3xl mx-auto">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                  index === currentQuote
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="text-center">
                  <blockquote className="text-gray-300 italic text-lg md:text-xl mb-4 min-h-[60px] flex items-center justify-center leading-relaxed">
                    "{quote.text}"
                  </blockquote>
                  <cite className="text-gray-400 text-sm md:text-base font-medium">
                    — {quote.author}
                  </cite>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
