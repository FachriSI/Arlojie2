import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyUsers = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		joinDate: "2025-07-30",
		totalOrders: 12,
		blocked: false,
		role: "user",
		orders: [
			{ id: 101, date: "2025-07-31", status: "Completed", amount: 120000 },
			{ id: 102, date: "2025-07-30", status: "Pending", amount: 50000 },
		],
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		joinDate: "2025-07-28",
		totalOrders: 5,
		blocked: false,
		role: "admin",
		orders: [
			{ id: 103, date: "2025-07-29", status: "Completed", amount: 200000 },
		],
	},
	// ...existing dummy users...
];

const AdminUserDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState(dummyUsers.find((u) => u.id === Number(id)));

	if (!user) {
		return (
			<div className="p-6">
				<h2 className="text-xl font-bold mb-4">User not found</h2>
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded"
					onClick={() => navigate(-1)}
				>
					Back
				</button>
			</div>
		);
	}

	const handleRoleChange = (e) => {
		setUser((prev) => ({ ...prev, role: e.target.value }));
	};

	return (
		<div className="p-6 bg-gray-100 min-h-screen">
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
					User Detail
				</h1>
				{/* ...existing user detail content... */}
			</div>
		</div>
	);
};

export default AdminUserDetail;
