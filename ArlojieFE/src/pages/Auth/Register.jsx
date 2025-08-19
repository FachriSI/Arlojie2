import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Terms from "../../components/termsmodal";

const Input = ({ label, type = "text", value, onChange, required = true }) => (
  <div className="mb-6">
    <label className="block mb-2 text-[15px] font-normal text-left">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full py-[14px] px-5 border-[1.5px] border-[#333] rounded-xl text-[15px] outline-none box-border focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300"
    />
  </div>
);

const PasswordInput = ({ label, value, onChange, visible, toggle }) => (
  <div className="mb-6">
    <label className="block mb-2 text-[15px] font-normal text-left">
      {label}
    </label>
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        required
        className="w-full py-[14px] px-5 pr-[50px] border-[1.5px] border-[#333] rounded-xl text-[15px] outline-none box-border focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300"
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-[5px] hover:bg-gray-100 rounded-full transition-colors duration-200"
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
          {visible ? (
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
);

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showTerms, setShowTerms] = useState(false);
  const [agree, setAgree] = useState(false);
  const [show, setShow] = useState({ password: false, confirm: false });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Arlojie | Register";
  }, []);
  useEffect(() => {
    if (alert.show)
      setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
  }, [alert.show]);

  const showAlert = (type, message) => setAlert({ show: true, type, message });
  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (form.password !== form.confirmPassword)
      return showAlert("error", "Password tidak cocok!"), setIsLoading(false);
    if (form.password.length < 6)
      return (
        showAlert("error", "Password minimal 6 karakter!"), setIsLoading(false)
      );
    setTimeout(() => {
      showAlert(
        "success",
        "Registrasi berhasil! Anda akan diarahkan ke halaman login."
      );
      setIsLoading(false);
      setTimeout(() => navigate("/login"), 2000);
    }, 1500);
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="flex flex-col lg:hidden h-screen w-screen relative overflow-hidden">
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
          <div className="flex-shrink-0 text-center pt-16 pb-8">
            <h1 className="text-4xl font-bold font-serif tracking-wider text-white mb-3">
              ARLOJIE
            </h1>
            <div className="mt-6">
              <div className="inline-block w-20 h-[2px] bg-white/60"></div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center px-6 pb-8">
            <div className="w-full max-w-sm">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold mb-6 text-white text-center">
                  Register
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Username */}
                  <div>
                    <label className="block mb-2 text-sm font-normal text-white/90">
                      Username
                    </label>
                    <input
                      type="text"
                      value={form.username}
                      onChange={handleChange("username")}
                      required
                      className="w-full py-3 px-4 bg-white/90 border border-white/30 rounded-xl text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                      placeholder="Masukkan username"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block mb-2 text-sm font-normal text-white/90">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      required
                      className="w-full py-3 px-4 bg-white/90 border border-white/30 rounded-xl text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                      placeholder="Masukkan email"
                    />
                  </div>
                  {/* Password */}
                  <div>
                    <label className="block mb-2 text-sm font-normal text-white/90">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={show.password ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange("password")}
                        required
                        className="w-full py-3 px-4 pr-12 bg-white/90 border border-white/30 rounded-xl text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                        placeholder="Masukkan password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShow((s) => ({ ...s, password: !s.password }))
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
                          {show.password ? (
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
                  {/* Konfirmasi Password */}
                  <div>
                    <label className="block mb-2 text-sm font-normal text-white/90">
                      Konfirmasi Password
                    </label>
                    <div className="relative">
                      <input
                        type={show.confirm ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        required
                        className="w-full py-3 px-4 pr-12 bg-white/90 border border-white/30 rounded-xl text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                        placeholder="Ulangi password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShow((s) => ({ ...s, confirm: !s.confirm }))
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
                          {show.confirm ? (
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
                  {/* Checkbox Terms */}
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="w-4 h-4 cursor-pointer appearance-none border-2 border-white/60 rounded-sm checked:bg-white checked:border-white relative transition-all duration-200"
                      required
                      style={{
                        backgroundImage: agree
                          ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='black' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e")`
                          : "none",
                        backgroundSize: "12px 12px",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                    <label className="text-xs text-white/90">
                      Saya setuju dengan{" "}
                      <span
                        onClick={() => setShowTerms(true)}
                        className="underline font-medium cursor-pointer hover:text-white/80 transition-colors duration-200"
                      >
                        Syarat dan Ketentuan
                      </span>
                    </label>
                  </div>
                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-out ${
                        isLoading
                          ? "bg-gray-500 text-white/80 scale-95"
                          : "bg-white text-black hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-white/30"
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Mendaftar...
                        </div>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </div>
                  {/* Login Link */}
                  <p className="text-center text-xs mt-4 text-white/90">
                    Sudah punya akun?{" "}
                    <span
                      onClick={() => navigate("/login")}
                      className="underline font-medium cursor-pointer hover:text-white/80 transition-colors duration-200"
                    >
                      Login disini
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Terms show={showTerms} onClose={() => setShowTerms(false)} />
      </div>
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen w-screen relative overflow-hidden">
        {/* Enhanced Smooth Alert - Simplified */}
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
            alert.show
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-full opacity-0 scale-95"
          }`}
        >
          <div
            className={`px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border flex items-center space-x-3 min-w-[200px] transition-all duration-300 ${
              alert.type === "success"
                ? "bg-white/95 border-gray-200 text-gray-800"
                : "bg-black/95 border-gray-700 text-white"
            }`}
          >
            {/* Simple Icon without excessive animations */}
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                alert.type === "success" ? "bg-black" : "bg-white"
              }`}
            >
              <svg
                className={`w-4 h-4 ${
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

            {/* Simple Message */}
            <p className="font-medium text-sm flex-1">{alert.message}</p>

            {/* Simple Close Button */}
            <button
              onClick={() => setAlert({ show: false, type: "", message: "" })}
              className={`flex-shrink-0 ml-4 transition-all duration-200 hover:scale-110 ${
                alert.type === "success"
                  ? "text-gray-400 hover:text-gray-600"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            ></button>
          </div>
        </div>

        <div
          className="flex-none w-[30%] bg-black relative overflow-hidden"
          data-aos="fade-right"
          data-aos-delay="200"
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

        <div
          className="flex-none w-[70%] bg-white flex items-center justify-start pl-20"
          data-aos="fade-up"
        >
          <div className="w-[800px]">
            <h1
              className="text-2xl font-semibold mb-12 -mt-12 text-left"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Register
            </h1>
            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-6" data-aos="fade-up" data-aos-delay="600">
                <label className="block mb-2 text-[15px] font-normal text-left">
                  Username
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={handleChange("username")}
                  required
                  className="w-full py-[14px] px-5 border-[1.5px] border-[#333] rounded-xl text-[15px] outline-none box-border focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div className="mb-6" data-aos="fade-up" data-aos-delay="700">
                <label className="block mb-2 text-[15px] font-normal text-left">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                  className="w-full py-[14px] px-5 border-[1.5px] border-[#333] rounded-xl text-[15px] outline-none box-border focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300"
                />
              </div>

              {/* Password */}
              <div className="mb-6" data-aos="fade-up" data-aos-delay="800">
                <label className="block mb-2 text-[15px] font-normal text-left">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={show.password ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange("password")}
                    required
                    className="w-full py-[14px] px-5 pr-[50px] border-[1.5px] border-[#333] rounded-xl text-[15px] outline-none box-border focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShow((s) => ({ ...s, password: !s.password }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-[5px] hover:bg-gray-100 rounded-full transition-colors duration-200"
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
                      {show.password ? (
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

              {/* Konfirmasi Password */}
              <div className="mb-6" data-aos="fade-up" data-aos-delay="900">
                <label className="block mb-2 text-[15px] font-normal text-left">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    type={show.confirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    required
                    className="w-full py-[14px] px-5 pr-[50px] border-[1.5px] border-[#333] rounded-xl text-[15px] outline-none box-border focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShow((s) => ({ ...s, confirm: !s.confirm }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-[5px] hover:bg-gray-100 rounded-full transition-colors duration-200"
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
                      {show.confirm ? (
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

              {/* Checkbox Terms */}
              <div
                className="flex items-center gap-2 mb-10"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="w-4 h-4 cursor-pointer appearance-none border-[1.5px] border-[#333] rounded-sm checked:bg-black checked:border-black relative transition-all duration-200"
                  required
                  style={{
                    backgroundImage: agree
                      ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e")`
                      : "none",
                    backgroundSize: "16px 16px",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <label className="text-sm">
                  Saya setuju dengan{" "}
                  <span
                    onClick={() => setShowTerms(true)}
                    className="text-black underline font-medium cursor-pointer hover:text-gray-700 transition-colors duration-200"
                  >
                    Syarat dan Ketentuan
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div data-aos="fade-up" data-aos-delay="1100">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-full text-base font-medium cursor-pointer transition-all duration-300 ease-out relative overflow-hidden ${
                    isLoading
                      ? "bg-gray-400 text-white scale-95"
                      : "bg-black text-white hover:scale-[1.02] hover:shadow-lg hover:bg-gray-900 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-black/20"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Mendaftar...
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>

              {/* Login Link */}
              <p
                className="text-center text-sm mt-4 text-black"
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                Sudah punya akun?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-black underline font-medium cursor-pointer hover:text-gray-700 transition-colors duration-200"
                >
                  Login disini
                </span>
              </p>
            </form>
          </div>
        </div>

        <Terms show={showTerms} onClose={() => setShowTerms(false)} />
      </div>
    </>
  );
};

export default Register;
