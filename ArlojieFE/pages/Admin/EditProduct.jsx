import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const categories = [
  "Jam Tangan Pria",
  "Jam Tangan Wanita",
  "Jam Tangan Anak-anak",
  "Smartwatch",
  "Aksesoris",
];
const statuses = ["aktif", "nonaktif"];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    status: "",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  // cache key unik per produk
  const cacheKey = `product_cache_${id}`;

  // fungsi ambil cache
  const loadCache = useCallback(() => {
    try {
      const raw = localStorage.getItem(cacheKey);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, [cacheKey]);

  // fungsi simpan cache
  const saveCache = useCallback(
    (product) => {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(product));
      } catch {
        // ignore error (misal localStorage full)
      }
    },
    [cacheKey]
  );

  // fungsi hapus cache
  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(cacheKey);
    } catch {
      // ignore
    }
  }, [cacheKey]);

  // Ambil data produk by ID (cache first, then fetch)
  useEffect(() => {
    const cached = loadCache();
    if (cached) {
      setForm((prev) => ({
        ...prev,
        name: cached.name || prev.name,
        description: cached.description || prev.description,
        price: cached.price || prev.price,
        category: cached.category || prev.category,
        stock: cached.stock || prev.stock,
        status: cached.status || prev.status,
      }));

      // if cache has preview images (base64) from an earlier file upload session, show them
      if (cached._hasNewImages && cached._previewImages && cached._previewImages.length > 0) {
        setPreview(cached._previewImages);
      } else if (cached.images && cached.images.length > 0) {
        setOldImages(cached.images);
        setPreview(cached.images.map((img) => `http://localhost:3000${img}`));
      }
    }

    axios
      .get(`http://localhost:3000/api/products/${id}`)
      .then((res) => {
        const product = res.data || {};

        // If user has cached edits, prefer them over server values
        const cachedNow = loadCache() || {};
        setForm(() => ({
          name: cachedNow.name ?? product.name ?? "",
          description: cachedNow.description ?? product.description ?? "",
          price: cachedNow.price ?? product.price ?? "",
          category: cachedNow.category ?? product.category ?? "",
          stock: cachedNow.stock ?? product.stock ?? "",
          status: cachedNow.status ?? product.status ?? "",
          images: [],
        }));

        // preview: show cached preview if user previously had images, otherwise server images
        if (cachedNow._hasNewImages && cachedNow.images && cachedNow.images.length > 0) {
          setOldImages(cachedNow.images);
          setPreview((cachedNow.images || []).map((img) => img.startsWith('http') ? img : `http://localhost:3000${img}`));
        } else if (product.images && product.images.length > 0) {
          setOldImages(product.images);
          setPreview(product.images.map((img) => `http://localhost:3000${img}`));
        }

        // Save latest server product snapshot into cache (without overwriting user edits)
        try {
          const existing = loadCache() || {};
          saveCache({ ...product, _hasNewImages: existing._hasNewImages || false });
        } catch {
          // ignore
        }
      })
      .catch(() => {
        /* kalau gagal fetch, biarkan pakai cache */
      });
  }, [id, loadCache, saveCache]);

  // Handle input text/select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      try {
        const cached = loadCache() || {};
        saveCache({ ...cached, ...next });
      } catch {
        // ignore cache errors
      }
      return next;
    });
  };

  // Handle upload foto baru
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setForm((prev) => ({ ...prev, images: files }));

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreview(urls);

    // Convert files to base64 so preview can be stored in localStorage (persist across reload)
    const readFileAsDataURL = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    (async () => {
      try {
        const base64s = await Promise.all(files.map(f => readFileAsDataURL(f)));
        const cached = loadCache() || {};
        cached._hasNewImages = true;
        // store base64 previews in cache under '_previewImages' so we don't overwrite server image paths
        cached._previewImages = base64s;
        saveCache(cached);
      } catch {
        // ignore read/localStorage errors
      }
    })();
  };

  // cleanup object URL
  useEffect(() => {
    return () => {
      preview.forEach((p) => {
        try {
          if (p.startsWith("blob:")) URL.revokeObjectURL(p);
        } catch {
          // ignore
        }
      });
    };
  }, [preview]);

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Nama produk wajib diisi";
    if (!form.description.trim())
      newErrors.description = "Deskripsi wajib diisi";
    if (!form.price) newErrors.price = "Harga wajib diisi";
    if (!form.category) newErrors.category = "Kategori wajib dipilih";
    if (!form.stock) newErrors.stock = "Stok wajib diisi";
    if (!form.status) newErrors.status = "Status wajib dipilih";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("category", form.category);
      data.append("stock", form.stock);
      data.append("status", form.status);

      if (form.images.length > 0) {
        form.images.forEach((file) => {
          data.append("images", file);
        });
      } else {
        data.append("oldImages", JSON.stringify(oldImages));
      }

      await axios.put(`http://localhost:3000/api/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Produk berhasil diupdate!");
      clearCache();
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Gagal update produk!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 border">
        <h2 className="text-xl font-bold mb-6 text-center">Edit Produk</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama Produk */}
          <div>
            <label className="block mb-2 font-medium">Nama Produk</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="flex w-full h-[51px] px-[20px] py-[15px] rounded-[20px] border border-black"
              placeholder="Masukkan nama produk"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block mb-2 font-medium">Deskripsi</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="flex w-full h-[51px] px-[20px] py-[15px] rounded-[20px] border border-black"
              placeholder="Masukkan deskripsi produk"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Harga */}
          <div>
            <label className="block mb-2 font-medium">Harga</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="flex w-full h-[51px] px-[20px] py-[15px] rounded-[20px] border border-black"
              placeholder="Masukkan harga produk"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Kategori */}
          <div>
            <label className="block mb-2 font-medium">Kategori</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="flex w-full h-[51px] px-[20px] py-[15px] rounded-[20px] border border-black"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Stok */}
          <div>
            <label className="block mb-2 font-medium">Stok</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="flex w-full h-[51px] px-[20px] py-[15px] rounded-[20px] border border-black"
              placeholder="Masukkan jumlah stok"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="flex w-full h-[51px] px-[20px] py-[15px] rounded-[20px] border border-black"
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

          {/* Upload Foto */}
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

              {preview.length > 0 && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  {preview.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded border"
                    />
                  ))}
                </div>
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

export default EditProduct;
