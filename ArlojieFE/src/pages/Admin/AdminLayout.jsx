import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          <AdminHeader />
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
