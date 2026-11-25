import React, { useEffect, useState } from 'react';
import { 
  Search, 
  X, 
  RefreshCw
} from 'lucide-react';
import { api } from '../api';

export const OrdersSection: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await api.getOrders({
        status: statusFilter === 'all' ? undefined : statusFilter,
        search: searchQuery || undefined,
      });
      if (data.success && data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.warn('Using seeded orders fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await api.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder && selectedOrder.orderId === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (err: any) {
      alert('Failed to update order status: ' + err.message);
    }
  };

  const statusOptions = ['all', 'pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500/15 text-blue-800 border-blue-500/30';
      case 'preparing':
        return 'bg-amber-500/15 text-amber-800 border-amber-500/30';
      case 'ready':
        return 'bg-purple-500/15 text-purple-800 border-purple-500/30';
      case 'completed':
        return 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30';
      case 'cancelled':
        return 'bg-red-500/15 text-red-800 border-red-500/30';
      default:
        return 'bg-espresso/10 text-espresso/70 border-espresso/20';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-espresso/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-olive block mb-2">
            Module 01 / Kitchen & POS Management
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-espresso tracking-tight">
            Order Fulfillment.
          </h1>
        </div>

        <button
          onClick={fetchOrders}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ivory-light border border-espresso/15 text-xs font-mono uppercase tracking-wider text-espresso/70 hover:text-espresso transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Feed</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {statusOptions.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-espresso text-ivory font-medium shadow-sm'
                  : 'bg-ivory-light text-espresso/70 hover:bg-ivory-dark/60'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, name, or phone..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-ivory-light border border-espresso/20 text-xs font-mono text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-caramel"
          />
        </form>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-ivory-light border border-espresso/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-espresso/5 border-b border-espresso/10 text-espresso/60 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Order Code</th>
                <th className="p-4">Time</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Type</th>
                <th className="p-4">Items Summary</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-espresso/5">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-ivory/60 transition-colors">
                    <td className="p-4 font-semibold text-espresso">{order.orderId}</td>
                    <td className="p-4 text-espresso/60 text-[11px]">
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-4 font-sans">
                      <div className="font-medium text-espresso">{order.customer?.name}</div>
                      <div className="text-[11px] text-espresso/60 font-mono">{order.customer?.phone}</div>
                    </td>
                    <td className="p-4 capitalize text-espresso/80">
                      {order.customer?.orderType?.replace('_', ' ') || 'Dine-in'}
                      {order.customer?.tableNumber && ` (${order.customer.tableNumber})`}
                    </td>
                    <td className="p-4 text-espresso/70 max-w-[200px] truncate">
                      {order.items?.map((i: any) => `${i.quantity}x ${i.name}`).join(', ')}
                    </td>
                    <td className="p-4 font-semibold text-espresso">₹{order.totalInr}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${
                        order.payment?.status === 'paid'
                          ? 'bg-emerald-500/15 text-emerald-800'
                          : 'bg-amber-500/15 text-amber-800'
                      }`}>
                        {order.payment?.method || 'razorpay'} · {order.payment?.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider border font-medium ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 rounded-lg bg-espresso/5 hover:bg-espresso hover:text-ivory text-espresso text-[11px] font-mono transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-espresso/50">
                    No orders match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal / Receipt Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-espresso/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-ivory border border-espresso/20 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-espresso/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-olive block">Receipt & Management</span>
                <h3 className="font-serif text-2xl font-medium text-espresso">{selectedOrder.orderId}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-full hover:bg-espresso/5 text-espresso/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Dining Details */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono p-4 rounded-xl bg-ivory-light border border-espresso/10">
              <div>
                <div className="text-espresso/50 text-[10px] uppercase">Customer</div>
                <div className="font-medium text-espresso font-sans mt-0.5">{selectedOrder.customer?.name}</div>
                <div className="text-espresso/70 mt-0.5">{selectedOrder.customer?.phone}</div>
              </div>
              <div>
                <div className="text-espresso/50 text-[10px] uppercase">Service Type</div>
                <div className="font-medium text-espresso capitalize mt-0.5">
                  {selectedOrder.customer?.orderType?.replace('_', ' ') || 'Dine-In'}
                </div>
                {selectedOrder.customer?.tableNumber && (
                  <div className="text-caramel font-semibold">Table: {selectedOrder.customer.tableNumber}</div>
                )}
              </div>
            </div>

            {/* Item Breakdown */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-olive block">Ordered Items</span>
              <div className="divide-y divide-espresso/10 border-y border-espresso/10 text-xs font-mono">
                {selectedOrder.items?.map((item: any, idx: number) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-espresso">{item.name}</span>
                      <span className="text-espresso/50 ml-2">× {item.quantity}</span>
                    </div>
                    <span className="font-semibold text-espresso">₹{item.subtotalInr || (item.priceInr * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="space-y-1 text-xs font-mono pt-2 text-espresso/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{selectedOrder.subtotalInr}</span>
                </div>
                <div className="flex justify-between text-espresso/60">
                  <span>Café GST (5%)</span>
                  <span>₹{selectedOrder.taxInr}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-semibold text-espresso pt-2 border-t border-espresso/10">
                  <span>Total Amount</span>
                  <span>₹{selectedOrder.totalInr}</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="p-4 rounded-xl bg-ivory-light border border-espresso/10 text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-espresso/60">Payment Method:</span>
                <span className="uppercase font-medium text-espresso">{selectedOrder.payment?.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-espresso/60">Payment Status:</span>
                <span className="font-semibold text-emerald-700 capitalize">{selectedOrder.payment?.status}</span>
              </div>
              {selectedOrder.payment?.razorpayPaymentId && (
                <div className="flex justify-between text-[11px] text-espresso/50">
                  <span>Razorpay ID:</span>
                  <span className="font-mono">{selectedOrder.payment.razorpayPaymentId}</span>
                </div>
              )}
            </div>

            {/* Quick Status Advance Control */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-espresso/60 block">Update Order Status</span>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.orderId, 'preparing')}
                  className={`py-2 rounded-xl border text-center transition-colors ${
                    selectedOrder.status === 'preparing'
                      ? 'bg-amber-600 text-ivory font-medium'
                      : 'bg-ivory-light border-espresso/15 hover:border-caramel'
                  }`}
                >
                  Preparing
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.orderId, 'ready')}
                  className={`py-2 rounded-xl border text-center transition-colors ${
                    selectedOrder.status === 'ready'
                      ? 'bg-purple-600 text-ivory font-medium'
                      : 'bg-ivory-light border-espresso/15 hover:border-caramel'
                  }`}
                >
                  Ready
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.orderId, 'completed')}
                  className={`py-2 rounded-xl border text-center transition-colors ${
                    selectedOrder.status === 'completed'
                      ? 'bg-emerald-600 text-ivory font-medium'
                      : 'bg-ivory-light border-espresso/15 hover:border-caramel'
                  }`}
                >
                  Complete
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
