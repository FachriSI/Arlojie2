import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2025-07-30",
    totalOrders: 12,
    blocked: false,
    role: "user",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    joinDate: "2025-07-28",
    totalOrders: 5,
    blocked: false,
    role: "admin",
  },
  {
    id: 3,
    name: "Alice Brown",
    email: "alice@example.com",
    joinDate: "2025-07-25",
    totalOrders: 2,
    blocked: true,
    role: "user",
  },
  {
    id: 4,
    name: "Bob Lee",
    email: "bob@example.com",
    joinDate: "2025-07-20",
    totalOrders: 8,
    blocked: false,
    role: "user",
  },
];

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(dummyUsers);
  const navigate = useNavigate();

  const handleBlockToggle = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, blocked: !user.blocked } : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <input
        type="text"
        placeholder="Search by name or email..."
        className="mb-4 p-2 border rounded w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Join Date</th>
              <th className="py-2 px-4 text-left">Total Orders</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Action</th>
              <th className="py-2 px-4 text-left">Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.joinDate}</td>
                <td className="py-2 px-4">{user.totalOrders}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td className="py-2 px-4">
                  {user.blocked ? (
                    <span className="text-red-500">Blocked</span>
                  ) : (
                    <span className="text-green-500">Active</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  <button
                    className={`px-3 py-1 rounded text-white ${
                      user.blocked ? "bg-green-600" : "bg-red-600"
                    }`}
                    onClick={() => handleBlockToggle(user.id)}
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
