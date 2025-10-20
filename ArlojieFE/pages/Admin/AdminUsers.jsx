import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // move fetchUsers outside so it can be reused after toggles
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token tidak ditemukan. Admin belum login.");
          navigate('/login');
          return;
        }

        const response = await axios.get("http://localhost:3000/api/admin/users", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const formattedUsers = (response.data || []).map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          joinDate: new Date(user.createdAt || user.created_at).toISOString().split("T")[0],
          role: user.role,
          status: user.status, // ambil dari backend (harusnya persisted)
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("TERJADI ERROR SAAT FETCHING:", error);
      }
    };

    fetchUsers();

  }, [navigate]); 

  const handleBlockToggle = async (id, currentStatus, e) => {
    if (e) e.stopPropagation();
    // prevent double click while loading for this id
    if (loadingMap[id]) return;
    setLoadingMap(prev => ({ ...prev, [id]: true }));
    // toggle status: active <-> blocked
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    try {
      const token = localStorage.getItem("token");
      // call server to toggle (server toggles regardless of body)
      const resp = await axios.put(
        `http://localhost:3000/api/admin/users/${id}/status`,
        { status: newStatus },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      // After toggle, always re-fetch the full list to guarantee synchronization with DB
      console.log('toggle response:', resp.data);
      const token2 = localStorage.getItem("token");
      const listResp = await axios.get("http://localhost:3000/api/admin/users", {
        headers: { Authorization: `Bearer ${token2}` },
      });
      const formatted = (listResp.data || []).map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        joinDate: new Date(user.createdAt || user.created_at).toISOString().split("T")[0],
        role: user.role,
        status: user.status,
      }));
      setUsers(formatted);
      alert(resp.data?.message || 'Status pengguna diperbarui.');

    } catch (error) {
      console.error("Gagal mengubah status user:", error);
      alert("Gagal mengubah status pengguna. Silakan coba lagi.");
    }
    finally {
      setLoadingMap(prev => ({ ...prev, [id]: false }));
    }
  };

  // per-row loading map to prevent double clicks
  const [loadingMap, setLoadingMap] = useState({});

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
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td className="py-2 px-4">
                  {user.status === 'blocked' ? (
                    <span className="text-red-500">Blocked</span>
                  ) : (
                    <span className="text-green-500">Active</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  <button
                    type="button"
                    title={user.status === 'blocked' ? 'Unblock user' : 'Block user'}
                    className={`px-3 py-1 rounded text-white cursor-pointer ${
                      user.status === 'blocked' ? "bg-green-600" : "bg-red-600"
                    }`}
                    onClick={(e) => handleBlockToggle(user.id, user.status, e)}
                    style={{ pointerEvents: 'auto', zIndex: 10 }}
                    disabled={!!loadingMap[user.id]}
                  >
                    {loadingMap[user.id] ? '...' : (user.status === 'blocked' ? 'Unblock' : 'Block')}
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
