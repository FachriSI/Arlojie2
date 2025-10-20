import React from "react";
import { NavLink } from "react-router-dom";
// Import SVG files
import DashboardIcon from "../../assets/sidebar/dashboard.svg";
import ProductIcon from "../../assets/sidebar/produk.svg";
import OrderIcon from "../../assets/sidebar/order.svg";
import AnalyticsIcon from "../../assets/sidebar/analytics.svg";
import UserIcon from "../../assets/sidebar/user.svg";
import CategoryIcon from "../../assets/sidebar/category.svg";

const menuItems = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/admin/dashboard",
  },
  {
    name: "Produk Management",
    icon: ProductIcon,
    path: "/admin/products",
  },
  {
    name: "Order Management",
    icon: OrderIcon,
    path: "/admin/orders",
  },
  {
    name: "Analytics",
    icon: AnalyticsIcon,
    path: "/admin/analytics",
  },
  {
    name: "User Management",
    icon: UserIcon,
    path: "/admin/users",
  },
  {
    name: "Category Management",
    icon: CategoryIcon,
    path: "/admin/categories",
  },
];

const AdminSidebar = () => {
  return (
    <aside className="bg-[#31250B] text-white w-64 min-h-screen flex flex-col py-6 px-4 shadow-lg">
      <div className="mb-10 flex items-center justify-center">
        <span className="font-bold text-2xl tracking-wide">ARLOJIE</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-[#3a2e1c] ${isActive ? "bg-[#3a2e1c]" : ""}`
                }
              >
                <img src={item.icon} alt={item.name + " icon"} className="w-6 h-6" />
                <span className="font-medium text-base">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
