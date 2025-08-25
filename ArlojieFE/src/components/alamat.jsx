import React, { useState } from "react";

const Alamat = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    namaLengkap: "",
    nomorTelepon: "",
    provinsi: "",
    kota: "",
    kecamatan: "",
    kelurahan: "",
    alamatLengkap: "",
    detailLainnya: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi sederhana di sisi frontend
    const requiredFields = ['namaLengkap', 'nomorTelepon', 'provinsi', 'kota', 'kecamatan', 'kelurahan', 'alamatLengkap'];
    const allFieldsFilled = requiredFields.every(field => form[field].trim() !== '');

    if (allFieldsFilled) {
        if (onSubmit) onSubmit(form);
    } else {
        alert("Harap lengkapi semua field yang wajib diisi!");
    }
  };

  return (
    <div className="bg-white rounded-2xl max-w-xl mx-auto p-6 shadow-2xl">
      <h2 className="text-2xl font-bold mb-1">Alamat Baru</h2>
      <p className="text-gray-500 mb-7">
        Untuk membuat pesanan, silahkan tambahkan alamat pengiriman
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="font-medium text-base mb-1 block">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="namaLengkap"
              value={form.namaLengkap}
              onChange={handleChange}
              required
              className="w-full border border-gray-800 rounded-xl px-3 py-1.5 text-base outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="font-medium text-base mb-1 block">
              Nomor Telepon
            </label>
            <input
              type="text"
              name="nomorTelepon"
              value={form.nomorTelepon}
              onChange={handleChange}
              required
              className="w-full border border-gray-800 rounded-xl px-3 py-1.5 text-base outline-none"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="font-medium text-base mb-1 block">Provinsi</label>
          <input
            type="text"
            name="provinsi"
            value={form.provinsi}
            onChange={handleChange}
            required
            className="w-full border border-gray-800 rounded-xl px-3 py-1.5 text-base outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="font-medium text-base mb-1 block">Kota</label>
          <input
            type="text"
            name="kota"
            value={form.kota}
            onChange={handleChange}
            required
            className="w-full border border-gray-800 rounded-xl px-3 py-1.5 text-base outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="font-medium text-base mb-1 block">Kecamatan</label>
          <input
            type="text"
            name="kecamatan"
            value={form.kecamatan}
            onChange={handleChange}
            required
            className="w-full border border-gray-800 rounded-xl px-3 py-1.5 text-base outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="font-medium text-base mb-1 block">Kelurahan</label>
          <input
            type="text"
            name="kelurahan"
            value={form.kelurahan}
            onChange={handleChange}
            required
            className="w-full border border-gray-800 rounded-xl px-3 py-1.5 text-base outline-none"
          />
        </div>
        <div className="mb-4">
            <label className="font-medium text-base mb-1 block">Nama Jalan, No Rumah</label>
          <textarea
            name="alamatLengkap"
            value={form.alamatLengkap}
            onChange={handleChange}
            required
            placeholder="Nama Jalan, No Rumah"
            className="w-full border border-gray-800 rounded-xl px-3 py-1.5 text-base outline-none resize-none"
          />
        </div>
        <div className="mb-8">
            <label className="font-medium text-base mb-1 block">Detail lainnya (Cth: Blok, unit, patokan)</label>
          <textarea
            name="detailLainnya"
            value={form.detailLainnya}
            onChange={handleChange}
            placeholder="Detail lainnya (Cth: Blok, unit, patokan)"
            className="w-full border border-gray-800 rounded-xl px-3 py-1.5 text-base outline-none resize-none"
          />
        </div>
        <div className="flex justify-center gap-6">
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-800 rounded-xl bg-white text-gray-800 px-8 py-2 font-medium text-lg hover:bg-gray-100 transition"
          >
            Nanti Saja
          </button>
          <button
            type="submit"
            className="border-none rounded-xl bg-black text-white px-8 py-2 font-medium text-lg hover:bg-gray-900 transition"
          >
            Ok
          </button>
        </div>
      </form>
    </div>
  );
};

export default Alamat;