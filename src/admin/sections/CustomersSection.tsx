import React, { useState } from 'react';
import { Search, Star, Coffee } from 'lucide-react';

export const CustomersSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [customers] = useState([
    {
      id: 'cust-1',
      name: 'Aarav Mehta',
      email: 'aarav.mehta@example.com',
      phone: '+91 98201 12345',
      totalOrders: 6,
      totalSpentInr: 3240,
      favoriteItem: 'Caramel Latte',
      loyaltyTier: 'Reserve Gold',
      lastVisited: 'Today',
    },
    {
      id: 'cust-2',
      name: 'Priya Sharma',
      email: 'priya.s@example.com',
      phone: '+91 98190 67890',
      totalOrders: 4,
      totalSpentInr: 1680,
      favoriteItem: 'Classic Cold Brew',
      loyaltyTier: 'Silver Member',
      lastVisited: 'Yesterday',
    },
    {
      id: 'cust-3',
      name: 'Kavita Roy',
      email: 'kavita.roy@example.com',
      phone: '+91 98450 11223',
      totalOrders: 9,
      totalSpentInr: 5120,
      favoriteItem: 'Matcha Latte',
      loyaltyTier: 'Platinum Connoisseur',
      lastVisited: '2 days ago',
    },
    {
      id: 'cust-4',
      name: 'Vikram Joshi',
      email: 'v.joshi@example.com',
      phone: '+91 97230 44556',
      totalOrders: 3,
      totalSpentInr: 1350,
      favoriteItem: 'Espresso',
      loyaltyTier: 'Silver Member',
      lastVisited: '5 days ago',
    },
  ]);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-espresso/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-olive block mb-2">
            Module 04.3 / Guest Directory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-espresso tracking-tight">
            Customer Profiles.
          </h1>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guests by name/phone..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-ivory-light border border-espresso/20 text-xs font-mono text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-caramel"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-ivory-light border border-espresso/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-espresso/5 border-b border-espresso/10 text-espresso/60 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4">Favorite Drink</th>
                <th className="p-4">Tier</th>
                <th className="p-4">Last Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-espresso/5">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-ivory/60 transition-colors">
                  <td className="p-4 font-sans font-medium text-espresso text-sm">
                    {cust.name}
                  </td>
                  <td className="p-4 space-y-0.5">
                    <div className="text-espresso font-mono">{cust.phone}</div>
                    <div className="text-[11px] text-espresso/60">{cust.email}</div>
                  </td>
                  <td className="p-4 font-semibold text-espresso">{cust.totalOrders} visits</td>
                  <td className="p-4 font-semibold text-espresso">₹{cust.totalSpentInr.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-caramel flex items-center gap-1.5 pt-4">
                    <Coffee className="w-3 h-3" />
                    <span>{cust.favoriteItem}</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-caramel/15 text-caramel font-semibold">
                      <Star className="w-2.5 h-2.5 fill-caramel" />
                      <span>{cust.loyaltyTier}</span>
                    </span>
                  </td>
                  <td className="p-4 text-espresso/70">{cust.lastVisited}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
