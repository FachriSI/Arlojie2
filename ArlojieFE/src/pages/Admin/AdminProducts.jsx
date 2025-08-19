import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminProducts = () => {
  // Contoh data dummy (nanti bisa diganti dari API)
  const products = [
    {
      id: 1,
      image: "/jam.png",
      name: "SKMEI Pinkish",
      category: "Jam Tangan Pria",
      price: "Rp. 4.545.000",
      stock: 102,
      status: "Active",
    },
    {
      id: 2,
      image: "/jam.png",
      name: "SKMEI Pinkish",
      category: "Jam Tangan Anak Anak",
      price: "Rp. 4.545.000",
      stock: 102,
      status: "Inactive",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Konten */}
      <div className="flex-1 flex flex-col">
        {/* Header Top */}
        <header className="flex justify-end items-center bg-black text-white px-6 py-4">
          <div className="flex flex-col text-right">
            <span className="font-medium">Budiman Saja</span>
            <span className="text-sm text-gray-400">Admin ARLOJIE</span>
          </div>
        </header>

        {/* Konten Utama */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-6">Produk Management</h1>

          {/* Search & Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Cari Produk"
                className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </div>
            <button className="ml-4 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800">
              Tambah Produk
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3">Foto</th>
                  <th className="px-4 py-3">Nama Produk</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Harga</th>
                  <th className="px-4 py-3">Stok</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="px-4 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">{product.price}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">
                      Edit
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              &lt;
            </button>
            <button className="px-3 py-1 border rounded bg-gray-200">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              2
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              3
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              &gt;
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-black text-white text-center py-4">
          ©2025 ARLOJIE. All Rights Reserved
        </footer>
      </div>
    </div>
  );
};

export default AdminProducts;