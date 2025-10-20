import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialCategory = {
  kategori: "Jam Tangan Pria",
  status: "Active"
};

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // Simulasi: data kategori diambil berdasarkan id
  const [form, setForm] = useState(initialCategory);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.kategori.trim()) newErrors.kategori = "Nama kategori wajib diisi";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    // Simulasi update kategori
    alert("Kategori berhasil diupdate!");
    navigate("/admin/categories");
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8 border border-gray-300">
        <h1 className="text-2xl font-bold mb-8 text-center" style={{fontSize:32}}>Edit Kategori Produk</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block mb-2 font-medium">Nama Kategori</label>
            <input
              type="text"
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="w-full h-[48px] px-6 py-3 rounded-2xl border border-black text-lg bg-[#F4F4F4]"
              placeholder="Masukkan nama kategori"
            />
            {errors.kategori && <p className="text-red-500 text-sm mt-1">{errors.kategori}</p>}
          </div>
          <div>
            <label className="block mb-2 font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full h-[48px] px-6 py-3 rounded-2xl border border-black text-lg bg-[#F4F4F4]"
            >
              <option value="" disabled>Pilih Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-between mt-12">
            <button
              type="button"
              className="w-[250px] h-[48px] rounded-2xl border border-black text-black bg-white text-base font-medium hover:bg-gray-100"
              onClick={() => navigate("/admin/categories")}
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="w-[250px] h-[48px] rounded-2xl bg-black text-white text-base font-medium hover:bg-gray-800"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
