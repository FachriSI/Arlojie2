import React from "react";
import { useNavigate } from "react-router-dom";

// Import SVG icons
import ordersIcon from "../../assets/dashboard/orders.svg";
import productIcon from "../../assets/dashboard/product.svg";
import usersIcon from "../../assets/dashboard/users.svg";
import revenueIcon from "../../assets/dashboard/general.svg";
import arrowUpIcon from "../../assets/dashboard/arrow-up.svg";
import arrowDownIcon from "../../assets/dashboard/arrow-down.svg";

const stats = [
	{ title: "Total Order", value: "120", icon: ordersIcon, change: 2.45, isIncrease: true },
	{ title: "Total Produk", value: "120", icon: productIcon, change: 1.23, isIncrease: false },
	{ title: "Total User", value: "120", icon: usersIcon, change: 2.45, isIncrease: true },
	{ title: "Total Revenue", value: "120", icon: revenueIcon, change: 0.85, isIncrease: false },
];

const orders = [
	{ id: "#348053", nama: "Akmal", tanggal: "11/04/2025", total: "Rp4.545.000", status: "Paid" },
	{ id: "#943946", nama: "Budi", tanggal: "12/04/2025", total: "Rp4.545.000", status: "Pending" },
	{ id: "#204769", nama: "Siti", tanggal: "13/04/2025", total: "Rp4.545.000", status: "Shipped" },
	{ id: "#391204", nama: "Andi", tanggal: "14/04/2025", total: "Rp4.545.000", status: "Delivered" },
	{ id: "#230586", nama: "Siti", tanggal: "13/04/2025", total: "Rp4.545.000", status: "Packed" },
];

const userRegistrations = [
	{ nama: "Akmal", email: "akmal01@gmail.com", tanggal: "11/04/2025" },
	{ nama: "Budi", email: "budii@gmail.com", tanggal: "12/04/2025" },
	{ nama: "Siti", email: "inisiti@gmail.com", tanggal: "13/04/2025" },
	{ nama: "Andi", email: "andi01@gmail.com", tanggal: "14/04/2025" },
	{ nama: "Siti", email: "inisiti@gmail.com", tanggal: "13/04/2025" },
];
const stokProduk = [
	{ produk: "Longines Master", stok: "4 tersisa" },
	{ produk: "SKMEI Pinkish", stok: "3 tersisa" },
	{ produk: "Longines Master", stok: "3 tersisa" },
	{ produk: "SKMEI Pinkish", stok: "2 tersisa" },
	{ produk: "Longines Master", stok: "4 tersisa" },
];

const statusColor = {
	Paid: "bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm",
	Pending: "bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm",
	Shipped: "bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm",
	Delivered: "bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm",
	Packed: "bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm",
};

const AdminDashboard = () => {
	const navigate = useNavigate();

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
				Dashboard
			</h1>
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
				{stats.map((stat, i) => (
					<div
						key={i}
						className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative"
						style={{
							display: "flex",
							width: "230px",
							height: "113px",
							padding: "15px 25px",
							alignItems: "flex-start",
							alignContent: "flex-start",
							gap: "10px 15px",
							flexWrap: "wrap",
						}}
					>
						{/* Icon di pojok kiri atas */}
						<div className="flex-shrink-0">
							<div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
								<img src={stat.icon} alt={stat.title} className="w-5 h-5" />
							</div>
						</div>

						{/* Konten utama */}
						<div className="flex-1 min-w-0">
							<p className="text-gray-500 text-xs font-medium mb-1">{stat.title}</p>
							<h2 className="text-xl font-bold text-gray-900 leading-tight">{stat.value}</h2>
						</div>

						{/* Persentase di bawah */}
						<div
							className={`w-full flex items-center text-xs font-medium mt-auto ${
								stat.isIncrease ? "text-green-500" : "text-red-500"
							}`}
						>
							<img
								src={stat.isIncrease ? arrowUpIcon : arrowDownIcon}
								alt={stat.isIncrease ? "increase" : "decrease"}
								className="w-3 h-3 mr-1 flex-shrink-0"
							/>
							{stat.change}%
						</div>
					</div>
				))}
			</div>

			{/* Recent Activities */}
			<h2 className="text-lg font-bold text-gray-900 font-['Plus_Jakarta_Sans']">Aktivitas Terkini</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* User Registration Table */}
				<div
					className="font-['Plus_Jakarta_Sans']"
					style={{
						display: "flex",
						width: "650px",
						height: "550px",
						padding: "30px",
						flexDirection: "column",
						alignItems: "flex-start",
						gap: "18px",
						flexShrink: 0,
						borderRadius: "5px",
						background: "#FFFFFF",
						boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.20)",
					}}
				>
					<h3 className="font-semibold text-lg text-gray-900">User Registration</h3>
					<table className="w-full bg-white border border-gray-300">
						<thead>
							<tr className="bg-gray-100 border-b border-gray-300">
								<th className="p-3 text-left font-medium text-gray-700">NAMA</th>
								<th className="p-3 text-left font-medium text-gray-700">EMAIL</th>
								<th className="p-3 text-left font-medium text-gray-700">TANGGAL</th>
							</tr>
						</thead>
						<tbody>
							{userRegistrations.map((user, idx) => (
								<tr key={idx} className="border-b border-gray-300">
									<td className="p-3">{user.nama}</td>
									<td className="p-3">{user.email}</td>
									<td className="p-3">{user.tanggal}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="flex justify-end w-full mt-auto">
						<button
							className="flex items-center gap-2 text-gray-700 font-medium hover:underline"
							onClick={() => navigate("/admin/users")}
						>
							Manage User
							<span className="text-xl">&rarr;</span>
						</button>
					</div>
				</div>
				{/* Stok Produk Tersisa Table */}
				<div
					className="font-['Plus_Jakarta_Sans']"
					style={{
						display: "flex",
						width: "650px",
						height: "550px",
						padding: "30px",
						flexDirection: "column",
						alignItems: "flex-start",
						gap: "18px",
						flexShrink: 0,
						borderRadius: "5px",
						background: "#FFFFFF",
						boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.20)",
					}}
				>
					<h3 className="font-semibold text-lg text-gray-900">Stok Produk Tersisa</h3>
					<table className="w-full bg-white border border-gray-300">
						<thead>
							<tr className="bg-gray-100 border-b border-gray-300">
								<th className="p-3 text-left font-medium text-gray-700">PRODUK</th>
								<th className="p-3 text-left font-medium text-gray-700">STOK</th>
							</tr>
						</thead>
						<tbody>
							{stokProduk.map((item, idx) => (
								<tr key={idx} className="border-b border-gray-300">
									<td className="p-3">{item.produk}</td>
									<td className="p-3 text-red-500">{item.stok}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="flex justify-end w-full mt-auto">
						<button
							className="flex items-center gap-2 text-gray-700 font-medium hover:underline"
							onClick={() => navigate("/admin/products")}
						>
							Tambah Produk
							<span className="text-xl">&rarr;</span>
						</button>
					</div>
				</div>
			</div>

			{/* Order Table */}
			<div className="flex justify-center">
				<div
					className="font-['Plus_Jakarta_Sans']"
					style={{
						display: "flex",
						width: "1060px",
						height: "472px",
						padding: "15px",
						flexDirection: "column",
						alignItems: "flex-start",
						gap: "18px",
						flexShrink: 0,
						borderRadius: "5px",
						background: "#FFFFFF",
						boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.20)",
					}}
				>
					<h3 className="font-semibold text-xl text-gray-900">Order</h3>
					<table className="w-full bg-white border border-gray-300">
						<thead>
							<tr className="bg-gray-100 border-b border-gray-300">
								<th className="p-3 text-left font-medium text-gray-700">ORDER ID</th>
								<th className="p-3 text-left font-medium text-gray-700">NAMA</th>
								<th className="p-3 text-left font-medium text-gray-700">TANGGAL</th>
								<th className="p-3 text-left font-medium text-gray-700">TOTAL</th>
								<th className="p-3 text-left font-medium text-gray-700">STATUS</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order, idx) => (
								<tr key={idx} className="border-b border-gray-300">
									<td className="p-3">{order.id}</td>
									<td className="p-3">{order.nama}</td>
									<td className="p-3">{order.tanggal}</td>
									<td className="p-3">{order.total}</td>
									<td className="p-3">
										<span className={statusColor[order.status] || statusColor["Paid"]}>
											{order.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="flex justify-end w-full mt-auto">
						<button
							className="flex items-center gap-2 text-gray-700 font-medium hover:underline"
							onClick={() => navigate("/admin/orders")}
						>
							Lihat semua order
							<span className="text-xl">&rarr;</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
