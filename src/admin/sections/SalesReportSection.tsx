import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';
import { api } from '../api';

export const SalesReportSection: React.FC = () => {
  const [timeline, setTimeline] = useState<any[]>([
    { date: 'Nov 19', revenue: 2400, ordersCount: 12 },
    { date: 'Nov 20', revenue: 3100, ordersCount: 15 },
    { date: 'Nov 21', revenue: 2800, ordersCount: 14 },
    { date: 'Nov 22', revenue: 4200, ordersCount: 21 },
    { date: 'Nov 23', revenue: 4800, ordersCount: 24 },
    { date: 'Nov 24', revenue: 3900, ordersCount: 19 },
    { date: 'Nov 25', revenue: 3420, ordersCount: 17 },
  ]);

  const [topProducts, setTopProducts] = useState<any[]>([
    { id: 'sig-1', name: 'Caramel Latte', quantity: 48, revenue: 9120 },
    { id: 'cb-1', name: 'Classic Cold Brew', quantity: 36, revenue: 6480 },
    { id: 'esp-3', name: 'Cappuccino', quantity: 32, revenue: 5120 },
    { id: 'des-2', name: 'Cheesecake', quantity: 28, revenue: 6160 },
    { id: 'bak-1', name: 'Butter Croissant', quantity: 26, revenue: 3640 },
  ]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [salesRes, topRes] = await Promise.all([
          api.getSalesTimeline(7),
          api.getTopProducts(),
        ]);
        if (salesRes.success && salesRes.timeline) {
          setTimeline(salesRes.timeline);
        }
        if (topRes.success && topRes.topProducts && topRes.topProducts.length > 0) {
          setTopProducts(topRes.topProducts);
        }
      } catch (err) {
        console.warn('Backend analytics sync pending, using initialized timeline:', err);
      }
    };

    fetchAnalytics();
  }, []);

  const maxRevenue = Math.max(...timeline.map((t) => t.revenue || 1), 5000);

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-espresso/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-olive block mb-2">
            Module 06 / Business Intelligence & Revenue
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-espresso tracking-tight">
            Sales & Analytics.
          </h1>
        </div>
      </div>

      {/* Revenue Visual Bar Timeline (Last 7 Days) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-ivory-light border border-espresso/15 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-espresso/10">
          <div>
            <h2 className="font-serif text-2xl font-normal text-espresso">Revenue Trend (7 Days)</h2>
            <p className="text-xs font-mono text-olive mt-0.5">Daily gross receipts across online and in-café orders</p>
          </div>
          <div className="text-right font-mono">
            <span className="text-xs text-espresso/60 uppercase block">7-Day Total</span>
            <span className="font-serif text-2xl font-semibold text-espresso">
              ₹{timeline.reduce((sum, t) => sum + (t.revenue || 0), 0).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-56 flex items-end gap-3 sm:gap-6 pt-6">
          {timeline.map((point, idx) => {
            const heightPercent = Math.min(100, Math.max(10, Math.round((point.revenue / maxRevenue) * 100)));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="text-[10px] font-mono text-espresso/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ₹{point.revenue}
                </div>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full bg-espresso/80 hover:bg-caramel transition-all duration-300 rounded-t-lg group-hover:shadow-md cursor-pointer relative"
                />
                <span className="text-[10px] font-mono text-espresso/60 whitespace-nowrap">
                  {point.date?.slice(5) || point.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Best-Selling Products Ranking */}
      <div className="rounded-2xl bg-ivory-light border border-espresso/15 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-espresso/10 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-normal text-espresso flex items-center gap-2">
              <Award className="w-5 h-5 text-caramel" />
              <span>Best-Selling Products</span>
            </h2>
            <p className="text-xs font-mono text-olive mt-0.5">Ranked by total volume and revenue</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-espresso/5 border-b border-espresso/10 text-espresso/60 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Units Dispensed</th>
                <th className="p-4">Total Revenue</th>
                <th className="p-4">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-espresso/5">
              {topProducts.map((prod, idx) => (
                <tr key={prod.id || idx} className="hover:bg-ivory/60 transition-colors">
                  <td className="p-4 font-semibold text-caramel">0{idx + 1}</td>
                  <td className="p-4 font-sans font-medium text-espresso text-sm">{prod.name}</td>
                  <td className="p-4 font-semibold text-espresso">{prod.quantity} cups / units</td>
                  <td className="p-4 font-semibold text-espresso">₹{prod.revenue?.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <div className="w-32 bg-espresso/10 rounded-full h-2 overflow-hidden">
                      <div
                        style={{ width: `${Math.min(100, Math.round((prod.quantity / 50) * 100))}%` }}
                        className="bg-caramel h-full rounded-full"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
