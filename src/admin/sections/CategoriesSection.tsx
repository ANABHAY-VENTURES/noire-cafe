import React, { useState } from 'react';
import { Tags } from 'lucide-react';

export const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState([
    { id: 'all', name: 'All Offerings', count: 20, active: true },
    { id: 'espresso', name: 'Espresso Bar', count: 4, active: true },
    { id: 'signature', name: 'Signature Coffee', count: 4, active: true },
    { id: 'cold-brew', name: 'Cold Brew Laboratory', count: 3, active: true },
    { id: 'tea-matcha', name: 'Tea & Uji Matcha', count: 3, active: true },
    { id: 'bakery', name: 'Artisan Bakery', count: 3, active: true },
    { id: 'desserts', name: 'Pastry & Desserts', count: 3, active: true },
  ]);
  const [newCatName, setNewCatName] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const id = newCatName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    setCategories([...categories, { id, name: newCatName.trim(), count: 0, active: true }]);
    setNewCatName('');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-espresso/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-olive block mb-2">
            Module 04.2 / Taxonomy
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-espresso tracking-tight">
            Categories & Flow.
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Category List */}
        <div className="md:col-span-2 rounded-2xl bg-ivory-light border border-espresso/15 overflow-hidden shadow-sm">
          <div className="p-4 bg-espresso/5 border-b border-espresso/10 text-xs font-mono uppercase tracking-wider text-espresso/60 flex justify-between">
            <span>Category Name</span>
            <span>Items Count</span>
          </div>

          <div className="divide-y divide-espresso/5">
            {categories.map((cat, idx) => (
              <div key={cat.id} className="p-4 flex items-center justify-between hover:bg-ivory/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-espresso/40">0{idx + 1}</span>
                  <div>
                    <div className="font-serif text-base font-medium text-espresso">{cat.name}</div>
                    <div className="text-[10px] font-mono text-olive uppercase">{cat.id}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-espresso/5 text-xs font-mono text-espresso/80">
                    {cat.count} items
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Category Form */}
        <div className="p-6 rounded-2xl bg-ivory-light border border-espresso/15 space-y-4 h-fit">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-olive">
            <Tags className="w-3.5 h-3.5 text-caramel" />
            <span>Create New Category</span>
          </div>

          <form onSubmit={handleAddCategory} className="space-y-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-espresso/70">Category Name</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Seasonal Micro-Lots"
                className="w-full px-3 py-2 rounded-xl bg-ivory border border-espresso/20 text-espresso font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-espresso text-ivory text-xs uppercase tracking-wider hover:bg-caramel transition-colors"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
