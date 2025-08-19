import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Alert states
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const navigate = useNavigate();

  // Auto hide alert after 3 seconds
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showAlert("error", "Password tidak cocok!");
      return;
    }

    if (newPassword.length < 6) {
      showAlert("error", "Password minimal 6 karakter!");
      return;
    }

    // Handle password reset logic here
    showAlert("success", "Password berhasil direset!");

    // Navigate after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      {/* Alert */}
      <div
        className={`fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out px-4 ${
          alert.show
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-full opacity-0 scale-95"
        }`}
      >
        <div
          className={`px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-2xl backdrop-blur-md border flex items-center space-x-3 min-w-[280px] md:min-w-[360px] transition-all duration-300 ${
            alert.type === "success"
              ? "bg-white/95 border-gray-200 text-gray-800"
              : "bg-black/95 border-gray-700 text-white"
          }`}
        >
          <div
            className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center ${
              alert.type === "success" ? "bg-black" : "bg-white"
            }`}
          >
            <svg
              className={`w-3 h-3 md:w-4 md:h-4 ${
                alert.type === "success" ? "text-white" : "text-black"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  alert.type === "success"
                    ? "M5 13l4 4L19 7"
                    : "M6 18L18 6M6 6l12 12"
                }
              />
            </svg>
          </div>
          <p className="font-medium text-xs md:text-sm flex-1">
            {alert.message}
          </p>
          <button
            onClick={() => setAlert({ show: false, type: "", message: "" })}
            className={`flex-shrink-0 ml-2 md:ml-4 transition-all duration-200 hover:scale-110 ${
              alert.type === "success"
                ? "text-gray-400 hover:text-gray-600"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <svg
              className="w-3 h-3 md:w-4 md:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          src="/Arlojie.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Blur Overlay */}
        <div
          className="absolute inset-0 bg-black/30"
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 text-center pt-16 pb-8">
            <h1 className="text-4xl font-bold font-serif tracking-wider text-white mb-3">
              ARLOJIE
            </h1>
            <div className="mt-6">
              <div className="inline-block w-20 h-[2px] bg-white/60"></div>
            </div>
          </div>
          {/* Form */}
          <div className="flex-1 flex items-center justify-center px-6 pb-8">
            <div className="w-full max-w-sm">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold mb-6 text-white text-center">
                  Reset Password
                </h2>
                <form onSubmit={handleResetPassword} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="block mb-2 text-sm font-normal text-white/90">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 px-4 bg-white/90 border border-white/30 rounded-xl text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                      placeholder="Masukkan email Anda"
                      required
                    />
                  </div>
                  {/* Password Baru */}
                  <div>
                    <label className="block mb-2 text-sm font-normal text-white/90">
                      Password Baru
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full py-3 px-4 pr-12 bg-white/90 border border-white/30 rounded-xl text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                        placeholder="Masukkan password baru"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {showPassword ? (
                            <>
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </>
                          ) : (
                            <>
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                              <path d="M12.12 12.12a3 3 0 0 1-4.24-4.24" />
                              <line x1="1" y1="1" x2="23" y2="23" />
                            </>
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>
                  {/* Konfirmasi Password Baru */}
                  <div>
                    <label className="block mb-2 text-sm font-normal text-white/90">
                      Konfirmasi Password Baru
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full py-3 px-4 pr-12 bg-white/90 border border-white/30 rounded-xl text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                        placeholder="Ulangi password baru"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {showConfirmPassword ? (
                            <>
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </>
                          ) : (
                            <>
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                              <path d="M12.12 12.12a3 3 0 0 1-4.24-4.24" />
                              <line x1="1" y1="1" x2="23" y2="23" />
                            </>
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>
                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-out bg-white text-black hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-white/30"
                    >
                      Reset Password
                    </button>
                  </div>
                  {/* Login Link */}
                  <p className="text-center text-xs mt-4 text-white/90">
                    Kembali ke{" "}
                    <span
                      onClick={() => navigate("/login")}
                      className="underline font-medium cursor-pointer hover:text-white/80 transition-colors duration-200"
                    >
                      Halaman Login
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen w-screen relative overflow-hidden">
        {/* Left side - Black background */}
        <div
          className="flex-none w-[30%] bg-black relative overflow-hidden"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <video
            src="/Arlojie.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40" />
        </div>

        {/* Right side - White background with rounded corners */}
        <div
          className="flex-none w-[70%] bg-white flex items-center pl-20 justify-start"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="w-[800px]">
            <h1 className="text-2xl font-semibold mb-12 -mt-12 text-left">
              Reset Password
            </h1>

            <form onSubmit={handleResetPassword}>
              {/* Email Input */}
              <div className="mb-6" data-aos="fade-up" data-aos-delay="500">
                <label className="block mb-2 text-[15px] font-normal text-left">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-[14px] px-5 border-[1.5px] border-[#333] rounded-xl text-[15px] outline-none box-border focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300"
                  required
                />
              </div>

              {/* Password Baru Input */}
              <div className="mb-6" data-aos="fade-up" data-aos-delay="600">
                <label className="block mb-2 text-[15px] font-normal text-left">
                  Password Baru
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full py-[14px] px-5 pr-[50px] border-[1.5px] border-[#333] rounded-xl text-[15px] outline-none box-border focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer p-[5px] flex items-center hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {showPassword ? (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      ) : (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Konfirmasi Password Baru Input */}
              <div className="mb-8" data-aos="fade-up" data-aos-delay="700">
                <label className="block mb-2 text-[15px] font-normal text-left">
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full py-[14px] px-5 pr-[50px] border-[1.5px] border-[#333] rounded-xl text-[15px] outline-none box-border focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer p-[5px] flex items-center hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {showConfirmPassword ? (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      ) : (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-black text-white border-none rounded-full text-base font-medium cursor-pointer mt-4 mb-6 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out active:scale-95"
              >
                Reset Password
              </button>
            </form>

            <p className="text-center text-sm m-0 text-black">
              Kembali ke{" "}
              <a
                onClick={() => navigate("/login")}
                className="text-black underline font-medium cursor-pointer transition-colors duration-200 hover:text-gray-600"
              >
                Halaman Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
