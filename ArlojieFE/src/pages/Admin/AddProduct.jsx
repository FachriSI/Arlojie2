import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Dropdown menu Edit (tanpa button biru, routing hanya pada menu dropdown)
const EditDropdownButton = ({ onEdit }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-[85px] h-[37px] rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-gray-100 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        Edit
        <svg
          className="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-[85px] origin-top-right rounded-md bg-white border border-gray-200 shadow-lg z-10">
          <button
            className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100"
            onClick={() => {
              setOpen(false);
              onEdit && onEdit();
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

const categories = [
  "Jam Tangan Pria",
  "Jam Tangan Wanita",
  "Jam Tangan Anak Anak",
  "Smartwatch",
  "Aksesoris",
];
const statuses = ["Active", "Inactive"];

const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    namaProduk: "",
    deskripsi: "",
    harga: "",
    kategori: "",
    stok: "",
    status: "",
    foto: [],
  });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setForm((prev) => ({ ...prev, foto: files }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    let newErrors = {};
    if (!form.namaProduk.trim())
      newErrors.namaProduk = "Nama produk wajib diisi";
    if (!form.deskripsi.trim())
      newErrors.deskripsi = "Deskripsi wajib diisi";
    if (!form.harga.trim()) newErrors.harga = "Harga wajib diisi";
    if (!form.kategori) newErrors.kategori = "Kategori wajib dipilih";
    if (!form.stok.trim()) newErrors.stok = "Stok wajib diisi";
    if (!form.status) newErrors.status = "Status wajib dipilih";
    if (form.foto.length === 0) newErrors.foto = "Minimal 1 foto produk";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      // Siapkan form data untuk dikirim ke backend
      const data = new FormData();
      data.append("name", form.namaProduk);
      data.append("description", form.deskripsi);
      data.append("price", form.harga.replace(/[^\d]/g, "")); // buang Rp, titik, koma
      data.append("category", form.kategori);
      data.append("stock", form.stok);
      data.append("status", form.status);
      form.foto.forEach((file) => {
        data.append("images", file);
      });

      // Kirim ke backend
      await axios.post("http://localhost:3000/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Produk berhasil ditambahkan!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Gagal menambahkan produk:", error);
      alert("Gagal menambahkan produk. Coba lagi!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 border">
        {/* Dropdown menu Edit */}
        <div className="mb-4 flex justify-end">
          <EditDropdownButton onEdit={() => navigate("/admin/products/edit/1")} />
        </div>
        <h2 className="text-xl font-bold mb-6 text-center">Tambah Produk</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama Produk */}
          <div>
            <label className="block mb-2 font-medium">Nama Produk</label>
            <input
              type="text"
              name="namaProduk"
              value={form.namaProduk}
              onChange={handleChange}
              className="flex w-[694px] h-[51px] px-[20px] py-[15px] items-center gap-[10px] rounded-[20px] border border-black"
              placeholder="Masukkan nama produk"
            />
            {errors.namaProduk && (
              <p className="text-red-500 text-sm mt-1">{errors.namaProduk}</p>
            )}
          </div>
          {/* Deskripsi */}
          <div>
            <label className="block mb-2 font-medium">Deskripsi</label>
            <input
              type="text"
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              className="flex w-[694px] h-[51px] px-[20px] py-[15px] items-center gap-[10px] rounded-[20px] border border-black"
              placeholder="Masukkan deskripsi produk"
            />
            {errors.deskripsi && (
              <p className="text-red-500 text-sm mt-1">{errors.deskripsi}</p>
            )}
          </div>
          {/* Harga */}
          <div>
            <label className="block mb-2 font-medium">Harga</label>
            <input
              type="text"
              name="harga"
              value={form.harga}
              onChange={handleChange}
              className="flex w-[694px] h-[51px] px-[20px] py-[15px] items-center gap-[10px] rounded-[20px] border border-black"
              placeholder="Masukkan harga produk"
            />
            {errors.harga && (
              <p className="text-red-500 text-sm mt-1">{errors.harga}</p>
            )}
          </div>
          {/* Kategori */}
          <div>
            <label className="block mb-2 font-medium">Kategori</label>
            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.kategori && (
              <p className="text-red-500 text-sm mt-1">{errors.kategori}</p>
            )}
          </div>
          {/* Stok */}
          <div>
            <label className="block mb-2 font-medium">Stok</label>
            <input
              type="text"
              name="stok"
              value={form.stok}
              onChange={handleChange}
              className="flex w-[694px] h-[51px] px-[20px] py-[15px] items-center gap-[10px] rounded-[20px] border border-black"
              placeholder="Masukkan jumlah stok"
            />
            {errors.stok && (
              <p className="text-red-500 text-sm mt-1">{errors.stok}</p>
            )}
          </div>
          {/* Status */}
          <div>
            <label className="block mb-2 font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            >
              <option value="">Pilih Status</option>
              {statuses.map((stat) => (
                <option key={stat} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>
          {/* Foto */}
          <div>
            <label className="block mb-2 font-medium">Upload Foto Produk</label>
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
              <input
                type="file"
                multiple
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="hidden"
                id="foto-upload"
              />
              <label
                htmlFor="foto-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <span className="text-4xl mb-2">📄</span>
                <span className="text-gray-700">
                  Klik disini untuk upload foto produk
                </span>
                <span className="text-xs text-gray-500">
                  Maksimal upload 3 file foto produk (PNG/JPG)
                </span>
              </label>
              {form.foto.length > 0 && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  {form.foto.map((file, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-200 px-2 py-1 rounded"
                    >
                      {file.name}
                    </span>
                  ))}
                </div>
              )}
              {errors.foto && (
                <p className="text-red-500 text-sm mt-2">{errors.foto}</p>
              )}
            </div>
          </div>
          {/* Tombol */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="px-8 py-2 rounded border border-gray-400 text-gray-700 bg-white hover:bg-gray-100"
              onClick={() => navigate("/admin/products")}
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="px-8 py-2 rounded bg-black text-white hover:bg-gray-800"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
