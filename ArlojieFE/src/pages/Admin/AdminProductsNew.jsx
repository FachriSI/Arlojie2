import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Watch1 from "../../assets/Home/jam1.svg";
import Watch2 from "../../assets/Home/jam2.svg";
import Watch3 from "../../assets/Home/jam3.svg";
import Watch4 from "../../assets/Home/jam4.svg";
import Watch5 from "../../assets/Home/jam5.svg";
import Watch6 from "../../assets/Home/jam6.svg";

const initialProducts = [
  { id: 1, foto: Watch1, namaProduk: "SKMEI Pinkish", kategori: "Jam Tangan Pria", harga: "Rp. 545.000", stok: 102, status: "Active" },
  { id: 2, foto: Watch2, namaProduk: "SKMEI Pinkish", kategori: "Jam Tangan Anak Anak", harga: "Rp. 545.000", stok: 102, status: "Inactive" },
  { id: 3, foto: Watch3, namaProduk: "SKMEI Pinkish", kategori: "Jam Tangan Anak Anak", harga: "Rp 4.545.000", stok: 102, status: "Active" },
  { id: 4, foto: Watch4, namaProduk: "SKMEI Pinkish", kategori: "Jam Tangan Anak Anak", harga: "Rp 4.545.000", stok: 102, status: "Inactive" },
  { id: 5, foto: Watch5, namaProduk: "SKMEI Pinkish", kategori: "Jam Tangan Anak Anak", harga: "Rp. 545.000", stok: 102, status: "Active" },
  { id: 6, foto: Watch6, namaProduk: "SKMEI Pinkish", kategori: "Jam Tangan Anak Anak", harga: "Rp 4.545.000", stok: 102, status: "Active" },
];

const statusColors = {
  Active: "bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm",
  Inactive: "bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm"
};

const AdminProductsNew = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const productsPerPage = 10;

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.namaProduk.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleDelete = () => {
    setProducts(prev => prev.filter(p => p.id !== deleteProductId));
    setShowDeleteModal(false);
    setDeleteProductId(null);
  };

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans']">
      <h1
        style={{
          color: 'var(--secondary, #000)',
          fontFamily: 'Plus Jakarta Sans',
          fontSize: '32px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: 'normal',
          margin: '32px 0 0 0',
        }}
      >
        Product Management
      </h1>
      {/* Header Section */}
      <div className="flex justify-end items-center">
        <button 
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => navigate('/admin/products/add')}
        >
          Tambah Produk
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Cari Produk"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FOTO</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAMA PRODUK</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KATEGORI</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HARGA</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STOK</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg p-1 flex items-center justify-center">
                    <img 
                      src={product.foto} 
                      alt={product.namaProduk}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{product.namaProduk}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{product.kategori}</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{product.harga}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{product.stok}</td>
                <td className="px-4 py-4">
                  <span className={statusColors[product.status]}>
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <select 
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => {
                      if (e.target.value === 'edit') {
                        navigate(`/admin/products/edit/${product.id}`);
                        e.target.value = '';
                      }
                      if (e.target.value === 'delete') {
                        setDeleteProductId(product.id);
                        setShowDeleteModal(true);
                        e.target.value = '';
                      }
                    }}
                  >
                    <option value="">Edit</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[400px] relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
              onClick={() => setShowDeleteModal(false)}
            >
              &times;
            </button>
            <h3 className="font-bold text-lg mb-2 text-black">Apa kamu yakin ingin menghapus produk ini?</h3>
            <p className="text-gray-600 mb-6 text-sm">Aksi ini bisa dibatalkan kembali</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-6 py-2 rounded bg-gray-200 text-black font-medium hover:bg-gray-300"
                onClick={() => setShowDeleteModal(false)}
              >
                Batalkan
              </button>
              <button
                className="px-6 py-2 rounded bg-black text-white font-medium hover:bg-gray-800"
                onClick={handleDelete}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        {/* Previous Button */}
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>
        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, index) => {
          let pageNumber;
          if (totalPages <= 5) {
            pageNumber = index + 1;
          } else if (currentPage <= 3) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + index;
          } else {
            pageNumber = currentPage - 2 + index;
          }

          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`px-3 py-2 text-sm border rounded ${
                currentPage === pageNumber
                  ? "bg-blue-500 text-white border-blue-500"
                  : "text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next Button */}
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default AdminProductsNew;