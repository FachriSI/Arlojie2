import { Home, Package, ShoppingCart, BarChart, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const navItems = [
    { to: "/admin/dashboard", icon: <Home size={18} />, label: "Dashboard" },
    { to: "/admin/users", icon: <Users size={18} />, label: "User Management" },
    { to: "/admin/orders", icon: <ShoppingCart size={18} />, label: "Order Management" },
    { to: "/admin/analytics", icon: <BarChart size={18} />, label: "Analytics" },
    { to: "/admin/products", icon: <Package size={18} />, label: "Produk Management" },
  ];

  return (
    <aside className="bg-[#31250B] text-white w-64 min-h-screen flex flex-col">
      <div className="px-6 py-4 text-2xl font-bold">ARLOJIE</div>
      <nav className="flex-1 px-3 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg ${isActive ? "bg-black" : "hover:bg-black"}`
            }
            end
          >
            {item.icon} {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
