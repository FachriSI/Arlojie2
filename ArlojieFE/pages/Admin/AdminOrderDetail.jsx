import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const statusOptions = ["Pending", "Packed", "Shipped", "Delivered", "Cancelled"];
const AdminOrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusValue, setStatusValue] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        // normalize id (remove non-digits if route contains '#')
        const rawId = String(id || "").replace(/\D/g, "");
        if (!rawId) {
          setError('ID pesanan tidak valid');
          setLoading(false);
          return;
        }
        const token = localStorage.getItem('token');
        const resp = await axios.get(`http://localhost:3000/api/admin/orders/${rawId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        const o = resp.data;
        // Build a friendly order object for the UI
        const products = (o.OrderItems || []).map(oi => {
          // Robust fallbacks: different DBs / seeds might store product name/price/qty under different keys
          const name = oi.Product?.name || oi.productName || oi.name || oi.title || '-';
          const qty = (oi.quantity ?? oi.qty ?? oi.amount ?? 0);
          const rawPrice = (oi.price ?? oi.harga ?? oi.priceAtPurchase ?? oi.unitPrice ?? 0);
          const priceNumber = Number(rawPrice) || 0;
          const priceFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(priceNumber);
          return {
            name,
            qty,
            price: priceNumber,
            priceFormatted,
          };
        });

  // prefer server-provided customerName/customerEmail (set by adminOrderController)
  const customerName = o.customerName || o.namaLengkap || o.User?.name || o.User?.email || '-';
  const customerPhone = o.nomorTelepon || o.User?.phone || '-';
        const alamatParts = [o.alamatLengkap, o.kelurahan, o.kecamatan, o.kota, o.provinsi, o.kodePos]
          .filter(p => p).join(', ');

        setOrder({
          id: `#${o.id}`,
          rawId: o.id,
          tanggal: new Date(o.createdAt || o.orderDate).toLocaleDateString('id-ID'),
          products,
          total: Number(o.totalPrice || o.total || 0),
          pembayaran: o.paymentMethod || o.pembayaran || '-',
          ekspedisi: o.shippingMethod || o.ekspedisi || '-',
          status: o.status ? String(o.status).charAt(0).toUpperCase() + String(o.status).slice(1) : '-',
          // set initial statusValue
          
          customer: {
            nama: customerName,
            email: o.customerEmail || o.User?.email || '-',
            hp: customerPhone,
            alamat: alamatParts || '-',
          }
        });
  setStatusValue(o.status ? String(o.status).charAt(0).toUpperCase() + String(o.status).slice(1) : '');
      } catch (err) {
        console.error('Gagal memuat detail order admin:', err.response?.data || err.message);
        setError('Gagal memuat detail pesanan.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div className="p-8">Memuat detail pesanan...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-[#F4F4F4] py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-left" style={{ fontSize: 32 }}>
            Order Management
          </h1>
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => navigate('/admin/orders')}
          >
            Kembali
          </button>
        </div>
        <div className="bg-white rounded-xl shadow p-8 border border-gray-300">
          <h2 className="text-xl font-bold mb-6">Detail Order</h2>
          <div className="bg-[#F4F4F4] rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-2">
                  <span className="font-medium">Order ID:</span> {order.id}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Tanggal Order:</span> {order.tanggal}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Produk:</span>
                  <div className="mt-2">
                    {order.products && order.products.length > 0 ? (
                      order.products.map((p, idx) => (
                        <div key={idx} className="text-sm text-gray-700 flex items-center justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{p.name}</span>
                              {order.status && String(order.status).toLowerCase() === 'cancelled' && (
                                <span className="inline-block bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">
                                  Dibatalkan
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">Qty: {p.qty ?? 0} • {p.priceFormatted}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-700">-</div>
                    )}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Total:</span> {Number(order.total).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Pembayaran:</span> {order.pembayaran}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Ekspedisi:</span> {order.ekspedisi}
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-medium">Status:</span>
                  <select
                    className="border rounded px-3 py-1 text-sm"
                    value={statusValue}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      setStatusValue(newStatus);
                      // send update to server
                      try {
                        setStatusUpdating(true);
                        const token = localStorage.getItem('token');
                        await axios.put(`http://localhost:3000/api/admin/orders/${order.rawId}/status`, { status: newStatus.toLowerCase() }, {
                          headers: token ? { Authorization: `Bearer ${token}` } : {}
                        });
                        // update UI order.status
                        setOrder((prev) => ({ ...prev, status: newStatus }));
                      } catch (err) {
                        console.error('Gagal update status order:', err.response?.data || err.message);
                        alert('Gagal memperbarui status. Coba lagi.');
                        // revert local selection
                        setStatusValue(order.status || '');
                      } finally {
                        setStatusUpdating(false);
                      }
                    }}
                    disabled={statusUpdating}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-6">Info Customer</h2>
          <div className="bg-[#F4F4F4] rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-2">
                  <span className="font-medium">Nama:</span> {order.customer.nama}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Email:</span> {order.customer.email}
                </div>
                <div className="mb-2">
                  <span className="font-medium">No Hp:</span> {order.customer.hp}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Alamat:</span> {order.customer.alamat}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button className="px-8 py-2 rounded-2xl bg-black text-white font-medium">
              Print Shipping Label
            </button>
            <button className="px-8 py-2 rounded-2xl bg-black text-white font-medium">
              Print Invoice
            </button>
          </div>
        </div>
      </div>
      <footer className="bg-black text-center py-4 text-white/60 text-sm mt-8">
        ©2025 ARLOJIE. All Rights Reserved
      </footer>
    </div>
  );
};

export default AdminOrderDetail;
