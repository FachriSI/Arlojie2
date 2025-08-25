import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

const AdminLayout = () => {
  const [user, setUser] = useState({ nama: 'Admin', email: 'admin@arlojie.com' });

  useEffect(() => {
    // Ambil data dari localStorage saat komponen dimuat
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    
    // Periksa jika data ada dan perbarui state
    if (userName && userEmail) {
      setUser({ nama: userName, email: userEmail });
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          {/* Teruskan data user sebagai prop ke AdminHeader */}
          <AdminHeader user={user} />
          <main className="flex-1 p-6 bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
      <footer className="bg-black text-center py-4 text-white/60 text-sm">
        ©2025 ARLOJIE. All Rights Reserved
      </footer>
    </div>
  );
};

export default AdminLayout;