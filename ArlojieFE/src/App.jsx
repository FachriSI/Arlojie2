import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Home from "./pages/User/home";
import Wishlist from "./pages/User/wishlist";
import Filter from "./pages/User/filter";
import NotFound from "./notfound";
import "./App.css";
import Arlojie from "./Arlojie";
import Keranjang from "./pages/User/keranjang";
import Checkout from "./pages/User/checkout";
import Ordermanage from "./pages/User/ordermanage";
import View from "./pages/User/view";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
// TODO: Integrasi API, hapus data dummy di masing-masing komponen setelah backend siap
import AdminUsers from "./pages/Admin/AdminUsers"; // User Management (data dummy, ganti dengan API)
import AdminUserDetail from "./pages/Admin/AdminUserDetail"; // User Detail (data dummy, ganti dengan API)
import AdminOrders from "./pages/Admin/AdminOrders"; // Order Management (data dummy, ganti dengan API)
import AdminOrderDetail from "./pages/Admin/AdminOrderDetail"; // Order Detail (data dummy, ganti dengan API)

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Arlojie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* User */}
          <Route path="/home" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/view" element={<View />} />
          <Route path="/ordermanage" element={<Ordermanage />} />

          {/* Admin */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:id" element={<AdminUserDetail />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:id" element={<AdminOrderDetail />} />
          </Route>

          {/* 404 Not Found - harus di paling bawah */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
