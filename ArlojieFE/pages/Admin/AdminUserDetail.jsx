import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminUserDetail = () => {
    // 1. Mengambil 'id' dari parameter URL (misal: /admin/user/5 -> id = 5)
    const { id } = useParams();
    const navigate = useNavigate();

    // 2. State untuk menyimpan data user, status loading, dan pesan error
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetail = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Anda harus login untuk melihat halaman ini.");
                setLoading(false);
                // Arahkan ke halaman login jika tidak ada token
                navigate('/login'); 
                return;
            }

            try {
                // 3. Melakukan request ke endpoint detail user dengan ID spesifik
                const response = await axios.get(`http://localhost:3000/api/admin/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Simpan data user yang didapat ke dalam state
                setUser(response.data);

            } catch (err) {
                console.error("Gagal mengambil detail user:", err.response?.data || err.message);
                setError("Gagal memuat data atau user tidak ditemukan.");
            } finally {
                // Hentikan loading setelah selesai (baik berhasil maupun gagal)
                setLoading(false);
            }
        };

        fetchUserDetail();
    }, [id, navigate]); // useEffect akan dijalankan ulang jika 'id' di URL berubah

    // 4. Tampilan saat data sedang dimuat
    if (loading) {
        return <div className="text-center p-10">Memuat detail pengguna...</div>;
    }

    // 5. Tampilan jika terjadi error
    if (error) {
        return <div className="text-center p-10 text-red-500">{error}</div>;
    }

    // 6. Tampilan utama jika data berhasil dimuat
    return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">User Detail</h1>
            
            {/* Kartu informasi utama */}
            <div className="bg-white shadow-lg rounded-lg p-8 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center">
                    <strong className="w-32 text-gray-500">Nama</strong>
                    <span className="text-gray-800">{user.name}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                    <strong className="w-32 text-gray-500">Email</strong>
                    <span className="text-gray-800">{user.email}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                    <strong className="w-32 text-gray-500">Role</strong>
                    <span className="text-gray-800 capitalize">{user.role}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                    <strong className="w-32 text-gray-500">Status</strong>
                    <span className={`py-1 px-3 rounded-full text-xs font-semibold ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.status === 'active' ? 'Active' : 'Blocked'}
                    </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                    <strong className="w-32 text-gray-500">Bergabung</strong>
                    <span className="text-gray-800">
                        {new Date(user.createdAt || user.created_at).toLocaleDateString('id-ID', {
                            day: '2-digit', month: 'long', year: 'numeric'
                        })}
                    </span>
                </div>
            </div>

            {/* Tombol kembali */}
            <button
                onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
                className="mt-8 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Kembali ke Daftar User
            </button>
        </div>
    );
};

export default AdminUserDetail;