import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  X
} from 'lucide-react';
import { api } from '../api';
import { MENU_ITEMS } from '../../data/coffeeData';

export const MenuManagementSection: React.FC = () => {
  const [items, setItems] = useState<any[]>(MENU_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null);

  const fetchMenu = async () => {
    try {
      const data = await api.getMenuItems();
      if (data.success && data.items && data.items.length > 0) {
        setItems(data.items);
      }
    } catch (err) {
      console.warn('Backend menu sync pending, using local items:', err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleToggleAvailability = async (id: string) => {
    try {
      await api.toggleItemAvailability(id);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
      );
    } catch {
      // Local toggle fallback
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
      );
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentItem) return;

    try {
      if (currentItem.isNew) {
        await api.createMenuItem(currentItem);
      } else {
        await api.updateMenuItem(currentItem.id, currentItem);
      }
      fetchMenu();
      setEditModalOpen(false);
    } catch (err: any) {
      alert('Failed to save menu item: ' + err.message);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'espresso', label: 'Espresso' },
    { id: 'signature', label: 'Signature' },
    { id: 'cold-brew', label: 'Cold Brew' },
    { id: 'tea-matcha', label: 'Tea & Matcha' },
    { id: 'bakery', label: 'Bakery' },
    { id: 'desserts', label: 'Desserts' },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-espresso/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-olive block mb-2">
            Module 04 / Product Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-espresso tracking-tight">
            Menu Management.
          </h1>
        </div>

        <button
          onClick={() => {
            setCurrentItem({
              id: `item-${Date.now().toString().slice(-4)}`,
              name: '',
              category: 'espresso',
              price: '₹150',
              priceInr: 150,
              description: '',
              image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
              badge: '',
              isAvailable: true,
              isNew: true,
            });
            setEditModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-espresso text-ivory text-xs font-mono uppercase tracking-wider hover:bg-caramel transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-espresso text-ivory font-medium shadow-sm'
                  : 'bg-ivory-light text-espresso/70 hover:bg-ivory-dark/60'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-ivory-light border border-espresso/20 text-xs font-mono text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-caramel"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              item.isAvailable !== false
                ? 'bg-ivory-light border-espresso/15 shadow-sm'
                : 'bg-espresso/5 border-espresso/10 opacity-75'
            }`}
          >
            <div>
              {/* Image & Badges */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-espresso/10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-espresso/80 text-caramel text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-caramel text-ivory text-[10px] font-mono uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-ivory/95 px-2.5 py-1 rounded-lg text-xs font-serif font-bold text-espresso shadow">
                  ₹{item.priceInr || item.price?.replace('₹', '')}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-medium text-espresso">{item.name}</h3>
                  <span className="text-[10px] font-mono text-olive uppercase">{item.id}</span>
                </div>
                <p className="text-xs text-espresso/70 line-clamp-2 font-sans font-light">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-espresso/10 flex items-center justify-between">
              {/* Availability Toggle */}
              <button
                onClick={() => handleToggleAvailability(item.id)}
                className={`inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  item.isAvailable !== false ? 'text-emerald-700' : 'text-red-700'
                }`}
              >
                {item.isAvailable !== false ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>In Stock</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Sold Out</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setCurrentItem({ ...item, isNew: false });
                  setEditModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg border border-espresso/15 text-xs font-mono uppercase tracking-wider text-espresso/75 hover:bg-espresso hover:text-ivory transition-colors flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editModalOpen && currentItem && (
        <div className="fixed inset-0 bg-espresso/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-ivory border border-espresso/20 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-espresso/10">
              <h3 className="font-serif text-2xl font-medium text-espresso">
                {currentItem.isNew ? 'Create New Product' : `Edit ${currentItem.name}`}
              </h3>
              <button onClick={() => setEditModalOpen(false)} className="p-2 text-espresso/60">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-espresso/70">Unique ID / Slug</label>
                  <input
                    type="text"
                    required
                    disabled={!currentItem.isNew}
                    value={currentItem.id}
                    onChange={(e) => setCurrentItem({ ...currentItem, id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso disabled:opacity-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-espresso/70">Category</label>
                  <select
                    value={currentItem.category}
                    onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso"
                  >
                    <option value="espresso">Espresso</option>
                    <option value="signature">Signature Coffee</option>
                    <option value="cold-brew">Cold Brew</option>
                    <option value="tea-matcha">Tea & Matcha</option>
                    <option value="bakery">Bakery</option>
                    <option value="desserts">Desserts</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-espresso/70">Product Name</label>
                <input
                  type="text"
                  required
                  value={currentItem.name}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                  placeholder="e.g. Vanilla Cold Coffee"
                  className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-espresso/70">Price in INR (₹)</label>
                  <input
                    type="number"
                    required
                    value={currentItem.priceInr || 150}
                    onChange={(e) => setCurrentItem({ ...currentItem, priceInr: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-espresso/70">Badge (Optional)</label>
                  <input
                    type="text"
                    value={currentItem.badge || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, badge: e.target.value })}
                    placeholder="e.g. Guest Favorite"
                    className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-espresso/70">Description</label>
                <textarea
                  rows={3}
                  required
                  value={currentItem.description || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                  placeholder="Sensory tasting notes and extraction narrative..."
                  className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-espresso/70">Image URL</label>
                <input
                  type="url"
                  required
                  value={currentItem.image || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-ivory-light border border-espresso/20 text-espresso"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-espresso text-ivory text-xs uppercase tracking-widest font-mono font-medium hover:bg-caramel transition-colors"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
