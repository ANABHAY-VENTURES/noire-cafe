import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Calendar, 
  AlertTriangle, 
  ArrowUpRight, 
  DollarSign, 
  Coffee, 
  Clock,
  Sparkles
} from 'lucide-react';
import { api } from '../api';
import { AdminTab } from '../AdminLayout';

interface OverviewSectionProps {
  onNavigateTab: (tab: AdminTab) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onNavigateTab }) => {
  const [metrics, setMetrics] = useState<any>({
    totalRevenue: 28450,
    todayRevenue: 3420,
    weekRevenue: 18900,
    monthRevenue: 72400,
    totalOrders: 142,
    averageOrderValue: 200,
    activeOrders: 4,
    todayReservations: 6,
    pendingReservations: 2,
    lowStockItems: 1,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overviewRes, ordersRes] = await Promise.all([
          api.getAnalyticsOverview(),
          api.getOrders({ limit: '5' } as any),
        ]);

        if (overviewRes.success && overviewRes.metrics) {
          setMetrics(overviewRes.metrics);
        }
        if (ordersRes.success && ordersRes.orders) {
          setRecentOrders(ordersRes.orders.slice(0, 5));
        }
      } catch (err) {
        console.warn('Backend not yet reachable, using initialized metrics:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-espresso/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-olive mb-2">
            <Sparkles className="w-3.5 h-3.5 text-caramel" />
            <span>Café Operations Control</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-espresso tracking-tight">
            Executive Overview.
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-espresso/70">
            Sanctuary Active & Ready
          </span>
        </div>
      </div>

      {/* Low Stock Banner Alert if any */}
      {metrics.lowStockItems > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider font-semibold text-amber-900">
                Low Stock Threshold Alert
              </div>
              <p className="text-xs text-amber-800/80 mt-0.5">
                {metrics.lowStockItems} ingredient(s) are below safety threshold (e.g. Barista Oat Milk).
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('inventory')}
            className="px-4 py-2 rounded-xl bg-amber-700 text-ivory text-xs font-mono uppercase tracking-wider hover:bg-amber-800 transition-colors shrink-0"
          >
            Review Inventory
          </button>
        </div>
      )}

      {/* Primary 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-ivory-light border border-espresso/15 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-olive">
            <span>Today's Revenue</span>
            <DollarSign className="w-4 h-4 text-caramel" />
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-medium text-espresso">
            ₹{metrics.todayRevenue?.toLocaleString('en-IN') || '3,420'}
          </div>
          <div className="text-[11px] font-mono text-espresso/60 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span>Week: ₹{metrics.weekRevenue?.toLocaleString('en-IN') || '18,900'}</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-ivory-light border border-espresso/15 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-olive">
            <span>Active Orders</span>
            <ShoppingBag className="w-4 h-4 text-caramel" />
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-medium text-espresso">
            {metrics.activeOrders || 4}
          </div>
          <div className="text-[11px] font-mono text-espresso/60">
            Total Completed: {metrics.totalOrders || 142} orders
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-ivory-light border border-espresso/15 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-olive">
            <span>Average Order (AOV)</span>
            <Coffee className="w-4 h-4 text-caramel" />
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-medium text-espresso">
            ₹{metrics.averageOrderValue || 200}
          </div>
          <div className="text-[11px] font-mono text-espresso/60">
            Per customer transaction
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-ivory-light border border-espresso/15 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-olive">
            <span>Reservations Today</span>
            <Calendar className="w-4 h-4 text-caramel" />
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-medium text-espresso">
            {metrics.todayReservations || 6}
          </div>
          <div className="text-[11px] font-mono text-amber-700 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{metrics.pendingReservations || 2} awaiting approval</span>
          </div>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="p-6 rounded-2xl bg-ivory-light border border-espresso/15 space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-olive block">
          Quick Management Actions
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <button
            onClick={() => onNavigateTab('orders')}
            className="p-4 rounded-xl bg-ivory border border-espresso/15 hover:border-caramel hover:shadow-md transition-all text-left space-y-1 group"
          >
            <div className="text-espresso font-medium group-hover:text-caramel flex items-center justify-between">
              <span>View Live Orders</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] text-espresso/60 block">Process & fulfill orders</span>
          </button>

          <button
            onClick={() => onNavigateTab('reservations')}
            className="p-4 rounded-xl bg-ivory border border-espresso/15 hover:border-caramel hover:shadow-md transition-all text-left space-y-1 group"
          >
            <div className="text-espresso font-medium group-hover:text-caramel flex items-center justify-between">
              <span>Manage Tables</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] text-espresso/60 block">Table bookings & seating</span>
          </button>

          <button
            onClick={() => onNavigateTab('menu')}
            className="p-4 rounded-xl bg-ivory border border-espresso/15 hover:border-caramel hover:shadow-md transition-all text-left space-y-1 group"
          >
            <div className="text-espresso font-medium group-hover:text-caramel flex items-center justify-between">
              <span>Update Menu</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] text-espresso/60 block">Toggle stock & pricing</span>
          </button>

          <button
            onClick={() => onNavigateTab('inventory')}
            className="p-4 rounded-xl bg-ivory border border-espresso/15 hover:border-caramel hover:shadow-md transition-all text-left space-y-1 group"
          >
            <div className="text-espresso font-medium group-hover:text-caramel flex items-center justify-between">
              <span>Restock Goods</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] text-espresso/60 block">Record bean & dairy delivery</span>
          </button>
        </div>
      </div>

      {/* Live Recent Orders Snapshot */}
      <div className="p-6 rounded-2xl bg-ivory-light border border-espresso/15 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-espresso/10">
          <div>
            <h2 className="font-serif text-2xl font-normal text-espresso">Recent Orders</h2>
            <p className="text-xs font-mono text-olive mt-0.5">Real-time incoming customer transactions</p>
          </div>

          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-mono uppercase tracking-wider text-caramel hover:underline"
          >
            View All Orders →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-espresso/10 text-espresso/60 uppercase tracking-wider text-[10px]">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Items</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-espresso/5">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-ivory/50 transition-colors">
                    <td className="py-3 font-semibold text-espresso">{order.orderId}</td>
                    <td className="py-3 font-sans font-medium text-espresso">{order.customer?.name}</td>
                    <td className="py-3 text-espresso/70">
                      {order.items?.map((i: any) => `${i.quantity}x ${i.name}`).join(', ')}
                    </td>
                    <td className="py-3 font-semibold text-espresso">₹{order.totalInr}</td>
                    <td className="py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${
                        order.payment?.status === 'paid'
                          ? 'bg-emerald-500/15 text-emerald-800'
                          : 'bg-amber-500/15 text-amber-800'
                      }`}>
                        {order.payment?.status || 'pending'}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="capitalize text-espresso/80 font-medium">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-espresso/50">
                    No recent orders. Place an order on the menu to see live transactions.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
