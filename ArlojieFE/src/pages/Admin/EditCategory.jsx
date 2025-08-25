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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8 border">
        <h2 className="text-xl font-bold mb-6 text-center">Edit Kategori</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Nama Kategori</label>
            <input
              type="text"
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-black"
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
              className="w-full border rounded px-4 py-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="px-8 py-2 rounded border border-gray-400 text-gray-700 bg-white hover:bg-gray-100"
              onClick={() => navigate("/admin/categories")}
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

export default EditCategory;
