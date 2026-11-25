import React, { useState } from 'react';
import { CreditCard, Save, Check } from 'lucide-react';

export const SettingsSection: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    cafeName: 'NOIRÉ Café',
    tagline: 'A Slower Kind of Everyday.',
    phone: '+41 44 211 88 00',
    email: 'sanctuary@noirecafe.ch',
    address: 'Bahnhofstrasse 42, 8001 Zürich',
    currency: 'INR (₹)',
    taxRatePercent: 5,
    razorpayTestMode: true,
    emailNotifications: true,
    storeOpen: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-espresso/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-olive block mb-2">
            Module 07 / Configuration
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-espresso tracking-tight">
            Platform Settings.
          </h1>
        </div>

        {saved && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-800 text-xs font-mono">
            <Check className="w-3.5 h-3.5" />
            <span>Settings Saved Successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Café Identity */}
        <div className="p-6 rounded-2xl bg-ivory-light border border-espresso/15 space-y-4">
          <h2 className="font-serif text-xl font-medium text-espresso">Establishment Profile</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-espresso/70">Café Brand Name</label>
              <input
                type="text"
                value={form.cafeName}
                onChange={(e) => setForm({ ...form, cafeName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border border-espresso/20 text-espresso"
              />
            </div>
            <div className="space-y-1">
              <label className="text-espresso/70">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border border-espresso/20 text-espresso"
              />
            </div>
            <div className="space-y-1">
              <label className="text-espresso/70">Public Telephone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border border-espresso/20 text-espresso"
              />
            </div>
            <div className="space-y-1">
              <label className="text-espresso/70">Electronic Mail</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border border-espresso/20 text-espresso"
              />
            </div>
          </div>
        </div>

        {/* Razorpay Gateway Status */}
        <div className="p-6 rounded-2xl bg-ivory-light border border-espresso/15 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-medium text-espresso flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-caramel" />
              <span>Razorpay Integration</span>
            </h2>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/15 text-emerald-800 font-semibold border border-emerald-500/20">
              Active / Test Mode
            </span>
          </div>

          <div className="text-xs font-mono space-y-3">
            <div className="p-4 rounded-xl bg-ivory border border-espresso/10 space-y-2">
              <div className="flex justify-between">
                <span className="text-espresso/60">Gateway Mode:</span>
                <span className="font-semibold text-espresso">Razorpay Standard Checkout (UPI, Cards, Netbanking)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-espresso/60">Key ID:</span>
                <span className="font-mono text-caramel">rzp_test_NoireCafeDemo2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-espresso/60">Cryptographic Webhook:</span>
                <span className="font-mono text-emerald-700">HMAC SHA256 Signature Verification Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial & Tax Settings */}
        <div className="p-6 rounded-2xl bg-ivory-light border border-espresso/15 space-y-4">
          <h2 className="font-serif text-xl font-medium text-espresso">Taxes & Currency</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-espresso/70">Café GST Rate (%)</label>
              <input
                type="number"
                value={form.taxRatePercent}
                onChange={(e) => setForm({ ...form, taxRatePercent: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border border-espresso/20 text-espresso"
              />
            </div>
            <div className="space-y-1">
              <label className="text-espresso/70">Default Currency</label>
              <input
                type="text"
                disabled
                value={form.currency}
                className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border border-espresso/20 text-espresso opacity-75"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-mono font-medium hover:bg-caramel transition-colors shadow-lg flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </form>
    </div>
  );
};
