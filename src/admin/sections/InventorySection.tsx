import React, { useEffect, useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  X
} from 'lucide-react';
import { api } from '../api';

export const InventorySection: React.FC = () => {
  const [items, setItems] = useState<any[]>([
    { _id: 'inv-1', name: 'Single-Origin Reserve Beans', category: 'Coffee Beans', currentStock: 45.5, unit: 'kg', minThreshold: 10.0, costPerUnitInr: 1200, supplier: 'Direct-Trade Colombia Lots' },
    { _id: 'inv-2', name: 'Whole Pasture Milk', category: 'Dairy & Plant Milk', currentStock: 35.0, unit: 'L', minThreshold: 8.0, costPerUnitInr: 75, supplier: 'Alpine Dairy Farm' },
    { _id: 'inv-3', name: 'Barista Oat Milk', category: 'Dairy & Plant Milk', currentStock: 4.5, unit: 'L', minThreshold: 10.0, costPerUnitInr: 180, supplier: 'Oatly Barista' },
    { _id: 'inv-4', name: 'House Salted Caramel Syrup', category: 'Syrups & Botanicals', currentStock: 6.2, unit: 'L', minThreshold: 3.0, costPerUnitInr: 450, supplier: 'In-House Batch' },
    { _id: 'inv-5', name: 'Ceremonial Uji Matcha Powder', category: 'Tea & Matcha', currentStock: 2.8, unit: 'kg', minThreshold: 1.0, costPerUnitInr: 4200, supplier: 'Kyoto Tencha' },
    { _id: 'inv-6', name: 'Valrhona 70% Dark Chocolate', category: 'Bakery & Flour', currentStock: 12.0, unit: 'kg', minThreshold: 4.0, costPerUnitInr: 1600, supplier: 'Valrhona France' },
    { _id: 'inv-7', name: 'Takeaway Recycled Coffee Cups', category: 'Packaging', currentStock: 250, unit: 'units', minThreshold: 50, costPerUnitInr: 8, supplier: 'EcoKraft Zurich' },
  ]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'stock' | 'history'>('stock');
  const [restockModalOpen, setRestockModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<any | null>(null);
  const [restockQty, setRestockQty] = useState('');
  const [restockCost, setRestockCost] = useState('');

  const fetchInventory = async () => {
    try {
      const data = await api.getInventory();
      if (data.success && data.items && data.items.length > 0) {
        setItems(data.items);
      }
      const txData = await api.getInventoryTransactions();
      if (txData.success && txData.transactions) {
        setTransactions(txData.transactions);
      }
    } catch (err) {
      console.warn('Backend inventory fallback:', err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleRestockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIngredient || !restockQty) return;

    try {
      await api.recordPurchase({
        ingredientId: selectedIngredient._id,
        quantityAdded: parseFloat(restockQty),
        costInr: parseFloat(restockCost) || 0,
        notes: `Manual purchase entry by Admin`,
      });

      alert(`Restocked ${restockQty} ${selectedIngredient.unit} of ${selectedIngredient.name}!`);
      setRestockModalOpen(false);
      fetchInventory();
    } catch (err: any) {
      alert('Error recording purchase: ' + err.message);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-espresso/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-olive block mb-2">
            Module 05 / Stock Management & Recipe Consumption
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-espresso tracking-tight">
            Inventory & Ingredients.
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-ivory-light border border-espresso/15 rounded-full p-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab('stock')}
              className={`px-4 py-1.5 rounded-full transition-colors ${
                activeTab === 'stock' ? 'bg-espresso text-ivory font-medium' : 'text-espresso/70'
              }`}
            >
              Current Stock
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-1.5 rounded-full transition-colors ${
                activeTab === 'history' ? 'bg-espresso text-ivory font-medium' : 'text-espresso/70'
              }`}
            >
              Audit Trail
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'stock' ? (
        <div className="rounded-2xl bg-ivory-light border border-espresso/15 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-espresso/5 border-b border-espresso/10 text-espresso/60 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Ingredient Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Current Stock</th>
                  <th className="p-4">Safety Minimum</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Cost / Unit</th>
                  <th className="p-4">Supplier</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-espresso/5">
                {items.map((item) => {
                  const isLow = item.currentStock <= item.minThreshold;
                  return (
                    <tr key={item._id} className="hover:bg-ivory/60 transition-colors">
                      <td className="p-4 font-sans font-medium text-espresso text-sm">
                        {item.name}
                      </td>
                      <td className="p-4 text-espresso/70">{item.category}</td>
                      <td className="p-4 font-semibold text-espresso">
                        {item.currentStock} {item.unit}
                      </td>
                      <td className="p-4 text-espresso/60">
                        {item.minThreshold} {item.unit}
                      </td>
                      <td className="p-4">
                        {isLow ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold bg-red-500/15 text-red-700 border border-red-500/20">
                            <AlertTriangle className="w-2.5 h-2.5" />
                            <span>Low Stock</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-medium bg-emerald-500/15 text-emerald-800">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            <span>Optimal</span>
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-espresso/80">₹{item.costPerUnitInr} / {item.unit}</td>
                      <td className="p-4 text-espresso/60 text-[11px] max-w-[150px] truncate">
                        {item.supplier}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedIngredient(item);
                            setRestockQty('10');
                            setRestockCost((item.costPerUnitInr * 10).toString());
                            setRestockModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-espresso text-ivory text-[11px] font-mono hover:bg-caramel transition-colors"
                        >
                          Restock
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Audit Trail Table */
        <div className="rounded-2xl bg-ivory-light border border-espresso/15 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-espresso/5 border-b border-espresso/10 text-espresso/60 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Time</th>
                  <th className="p-4">Ingredient</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Quantity Change</th>
                  <th className="p-4">Related Order</th>
                  <th className="p-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-espresso/5">
                {transactions.length > 0 ? (
                  transactions.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-ivory/60 transition-colors">
                      <td className="p-4 text-espresso/60">
                        {new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-4 font-sans font-medium text-espresso">{tx.ingredientName}</td>
                      <td className="p-4 uppercase text-[10px] font-semibold text-espresso/80">
                        {tx.type.replace('_', ' ')}
                      </td>
                      <td className={`p-4 font-semibold ${tx.quantityDelta > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                        {tx.quantityDelta > 0 ? `+${tx.quantityDelta}` : tx.quantityDelta} {tx.unit}
                      </td>
                      <td className="p-4 font-mono text-caramel">{tx.orderId || '—'}</td>
                      <td className="p-4 text-espresso/70 text-[11px]">{tx.notes || '—'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-espresso/50">
                      Transactions will populate as orders are confirmed and stock is consumed.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Restock Purchase Modal */}
      {restockModalOpen && selectedIngredient && (
        <div className="fixed inset-0 bg-espresso/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-ivory border border-espresso/20 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-espresso/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-olive block">Restock Order</span>
                <h3 className="font-serif text-2xl font-medium text-espresso">{selectedIngredient.name}</h3>
              </div>
              <button onClick={() => setRestockModalOpen(false)} className="p-2 text-espresso/60">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRestockSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-espresso/70">Quantity to Add ({selectedIngredient.unit})</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={restockQty}
                  onChange={(e) => setRestockQty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-espresso/70">Total Purchase Cost in INR (₹)</label>
                <input
                  type="number"
                  value={restockCost}
                  onChange={(e) => setRestockCost(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-espresso text-ivory text-xs uppercase tracking-widest font-mono font-medium hover:bg-caramel transition-colors"
              >
                Record Purchase & Update Stock
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
