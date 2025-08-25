import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialCategories = [
	{ id: 1, kategori: "Jam Tangan Pria", status: "Active" },
	{ id: 2, kategori: "Jam Tangan Wanita", status: "Active" },
	{ id: 3, kategori: "Jam Tangan Anak Anak", status: "Active" },
];

const statusColors = {
	Active: "bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm",
	Inactive: "bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm",
};

const Categories = () => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState(initialCategories);
	const [searchTerm, setSearchTerm] = useState("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteCategoryId, setDeleteCategoryId] = useState(null);

	// Filter kategori berdasarkan pencarian
	const filteredCategories = categories.filter((cat) =>
		cat.kategori.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleDelete = () => {
		setCategories((prev) => prev.filter((c) => c.id !== deleteCategoryId));
		setShowDeleteModal(false);
		setDeleteCategoryId(null);
	};

	return (
		<div className="space-y-6 font-['Plus_Jakarta_Sans']">
			<h1
				style={{
					color: "var(--secondary, #000)",
					fontFamily: "Plus Jakarta Sans",
					fontSize: "32px",
					fontStyle: "normal",
					fontWeight: 600,
					lineHeight: "normal",
					margin: "32px 0 0 0",
				}}
			>
				Category Management
			</h1>
			{/* Header Section */}
			<div className="flex justify-end items-center">
				<button
					className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
					onClick={() => navigate("/admin/categories/add")}
				>
					Tambah Kategori
				</button>
			</div>

			{/* Search Bar */}
			<div className="relative">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<svg
						className="w-5 h-5 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
				<input
					type="text"
					placeholder="Cari Kategori"
					className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			{/* Table Section */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
				<table className="w-full">
					<thead>
						<tr className="bg-gray-50 border-b border-gray-200">
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								KATEGORI
							</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								STATUS
							</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filteredCategories.map((cat) => (
							<tr key={cat.id} className="hover:bg-gray-50">
								<td className="px-4 py-4 text-sm font-medium text-gray-900">
									{cat.kategori}
								</td>
								<td className="px-4 py-4">
									<span className={statusColors[cat.status]}>
										{cat.status}
									</span>
								</td>
								<td className="px-4 py-4">
									<select
										className="border border-gray-300 rounded-md px-2 py-1 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										onChange={(e) => {
											if (e.target.value === "edit") {
												navigate(`/admin/categories/edit/${cat.id}`);
												e.target.value = "";
											}
											if (e.target.value === "delete") {
												setDeleteCategoryId(cat.id);
												setShowDeleteModal(true);
												e.target.value = "";
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
						<h3 className="font-bold text-lg mb-2 text-black">
							Apa kamu yakin ingin menghapus kategori ini?
						</h3>
						<p className="text-gray-600 mb-6 text-sm">
							Aksi ini bisa dibatalkan kembali
						</p>
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
		</div>
	);
};

export default Categories;
