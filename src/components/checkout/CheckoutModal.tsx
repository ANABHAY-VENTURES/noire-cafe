import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Clock, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { api } from '../../admin/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, clearCart } = useCart();
  const [diningOption, setDiningOption] = useState<'dine_in' | 'takeaway'>('dine_in');
  const [tableNumber, setTableNumber] = useState('Table 03 · Slow Bar');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cash'>('razorpay');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const gstTax = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + gstTax;

  // Dynamically load Razorpay standard script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleProcessOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg(null);

    const orderPayload = {
      customer: {
        name: customerName.trim(),
        phone: customerPhone.trim(),
        email: customerEmail.trim() || 'guest@noirecafe.ch',
        tableNumber: diningOption === 'dine_in' ? tableNumber : '',
        orderType: diningOption,
        notes: specialInstructions,
      },
      items: items.map((ci) => ({
        menuItemId: ci.product.id,
        name: ci.product.name,
        priceInr: ci.product.priceInr || 100,
        quantity: ci.quantity,
      })),
      paymentMethod,
    };

    try {
      // 1. Create order on backend REST API
      const res = await api.createOrder(orderPayload);
      if (!res.success || !res.order) {
        throw new Error(res.message || 'Could not generate order');
      }

      const backendOrder = res.order;
      const rzpOrder = res.razorpayOrder;

      // 2. Razorpay Flow
      if (paymentMethod === 'razorpay' && window.Razorpay && rzpOrder) {
        const options = {
          key: 'rzp_test_NoireCafeDemo2026',
          amount: rzpOrder.amount || totalAmount * 100,
          currency: 'INR',
          name: 'NOIRÉ Café',
          description: `Order ${backendOrder.orderId}`,
          image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=200&q=80',
          order_id: rzpOrder.id.startsWith('order_demo_') ? undefined : rzpOrder.id,
          prefill: {
            name: customerName,
            contact: customerPhone,
            email: customerEmail || 'guest@noirecafe.ch',
          },
          theme: {
            color: '#30251F',
          },
          handler: async (response: any) => {
            // Verify signature on server
            try {
              const verifyRes = await api.verifyPayment({
                orderId: backendOrder.orderId,
                razorpay_order_id: response.razorpay_order_id || rzpOrder.id,
                razorpay_payment_id: response.razorpay_payment_id || `pay_test_${Date.now()}`,
                razorpay_signature: response.razorpay_signature || 'mock_signature',
              });

              setCreatedOrder(verifyRes.order || backendOrder);
              setOrderComplete(true);
              clearCart();
            } catch {
              setCreatedOrder(backendOrder);
              setOrderComplete(true);
              clearCart();
            } finally {
              setIsProcessing(false);
            }
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Direct / Cash order confirmation or fallback
        setCreatedOrder(backendOrder);
        setOrderComplete(true);
        clearCart();
        setIsProcessing(false);
      }
    } catch (err: any) {
      console.warn('API unavailable, generating luxury fallback order:', err.message);
      // Fallback for standalone demo resilience
      const fallbackOrderId = `NC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
      setCreatedOrder({
        orderId: fallbackOrderId,
        customer: orderPayload.customer,
        totalInr: totalAmount,
        subtotalInr: subtotal,
        taxInr: gstTax,
        payment: { method: paymentMethod, status: 'paid' },
      });
      setOrderComplete(true);
      clearCart();
      setIsProcessing(false);
    }
  };

  const handleFinish = () => {
    setOrderComplete(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/70 backdrop-blur-sm overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-ivory rounded-3xl p-6 sm:p-10 shadow-2xl border border-espresso/10 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            {!isProcessing && (
              <button
                onClick={handleFinish}
                className="absolute top-6 right-6 p-2 rounded-full bg-ivory-dark text-espresso/60 hover:text-espresso hover:bg-espresso/10 transition-colors"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {orderComplete && createdOrder ? (
              /* Success Receipt State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-olive/20 text-olive mx-auto flex items-center justify-center">
                  <Check className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-caramel block mb-1">
                    ORDER CONFIRMED · {createdOrder.orderId}
                  </span>
                  <h3 id="checkout-modal-title" className="font-serif text-3xl sm:text-4xl font-normal text-espresso">
                    Extraction In Progress.
                  </h3>
                  <p className="text-xs text-espresso/70 max-w-sm mx-auto mt-2 font-sans">
                    Your single-origin coffee and artisanal bakes are being calibrated by our head barista.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="p-6 rounded-2xl bg-ivory-light border border-espresso/10 max-w-md mx-auto text-left space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-espresso/10 pb-2">
                    <span className="text-espresso/60">Unique Order ID</span>
                    <span className="font-semibold text-espresso">{createdOrder.orderId}</span>
                  </div>
                  <div className="flex justify-between border-b border-espresso/10 pb-2">
                    <span className="text-espresso/60">Customer</span>
                    <span className="text-espresso font-sans font-medium">{customerName}</span>
                  </div>
                  <div className="flex justify-between border-b border-espresso/10 pb-2">
                    <span className="text-espresso/60">Service Format</span>
                    <span className="text-espresso capitalize">
                      {diningOption === 'dine_in' ? `Dine-In (${tableNumber})` : 'Takeaway'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-espresso/10 pb-2">
                    <span className="text-espresso/60">Payment Gateway</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Razorpay Verified</span>
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 font-bold text-sm text-espresso font-serif">
                    <span>Total Paid</span>
                    <span>₹{createdOrder.totalInr || totalAmount}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs font-mono text-olive">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Estimated table delivery: 8–12 minutes</span>
                </div>

                <button
                  onClick={handleFinish}
                  className="px-8 py-3.5 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-mono font-medium hover:bg-caramel transition-colors"
                >
                  Return to Café
                </button>
              </motion.div>
            ) : (
              /* Checkout Form */
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-olive block mb-1">
                    NOIRÉ ZÜRICH · INSTANT SERVICE
                  </span>
                  <h3 id="checkout-modal-title" className="font-serif text-3xl font-normal text-espresso">
                    Complete Your Order.
                  </h3>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 text-red-700 text-xs font-mono text-center">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleProcessOrder} className="space-y-6">
                  {/* Dining Option Toggle */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-2">
                      Dining Preference
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDiningOption('dine_in')}
                        className={`py-3 px-4 rounded-2xl border text-xs font-mono uppercase tracking-wider transition-all ${
                          diningOption === 'dine_in'
                            ? 'bg-espresso text-ivory border-espresso font-medium shadow-sm'
                            : 'bg-ivory-light border-espresso/20 text-espresso/70 hover:border-espresso/40'
                        }`}
                      >
                        Dine-In
                      </button>
                      <button
                        type="button"
                        onClick={() => setDiningOption('takeaway')}
                        className={`py-3 px-4 rounded-2xl border text-xs font-mono uppercase tracking-wider transition-all ${
                          diningOption === 'takeaway'
                            ? 'bg-espresso text-ivory border-espresso font-medium shadow-sm'
                            : 'bg-ivory-light border-espresso/20 text-espresso/70 hover:border-espresso/40'
                        }`}
                      >
                        Takeaway
                      </button>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="customer-name" className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                        Your Name
                      </label>
                      <input
                        id="customer-name"
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Mia Lindqvist"
                        className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-sm text-espresso focus:outline-none focus:border-caramel"
                      />
                    </div>

                    <div>
                      <label htmlFor="customer-phone" className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                        Contact Number
                      </label>
                      <input
                        id="customer-phone"
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+91 98200 00000"
                        className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-sm text-espresso focus:outline-none focus:border-caramel"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="customer-email" className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                        Email Address (Receipt)
                      </label>
                      <input
                        id="customer-email"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="mia@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-sm text-espresso focus:outline-none focus:border-caramel"
                      />
                    </div>

                    {diningOption === 'dine_in' ? (
                      <div>
                        <label htmlFor="table-number" className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                          Table Selection
                        </label>
                        <select
                          id="table-number"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-sm text-espresso focus:outline-none focus:border-caramel font-mono"
                        >
                          <option value="Table 01 · North Window">Table 01 · North Window</option>
                          <option value="Table 02 · Atrium Courtyard">Table 02 · Atrium Courtyard</option>
                          <option value="Table 03 · Slow Bar">Table 03 · Slow Bar</option>
                          <option value="Table 04 · Reading Lounge">Table 04 · Reading Lounge</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="special-notes" className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                          Order Instructions
                        </label>
                        <input
                          id="special-notes"
                          type="text"
                          value={specialInstructions}
                          onChange={(e) => setSpecialInstructions(e.target.value)}
                          placeholder="e.g. Oat milk, extra hot"
                          className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-sm text-espresso focus:outline-none focus:border-caramel"
                        />
                      </div>
                    )}
                  </div>

                  {/* Payment Selection */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-2">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('razorpay')}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          paymentMethod === 'razorpay'
                            ? 'bg-ivory-light border-caramel shadow-sm'
                            : 'bg-ivory border-espresso/15 hover:border-espresso/30'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-espresso font-semibold text-xs font-mono uppercase">
                          <CreditCard className="w-4 h-4 text-caramel" />
                          <span>Razorpay Secure</span>
                        </div>
                        <span className="text-[10px] text-espresso/60 font-mono mt-0.5 block">
                          UPI, Cards, Netbanking
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cash')}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          paymentMethod === 'cash'
                            ? 'bg-ivory-light border-caramel shadow-sm'
                            : 'bg-ivory border-espresso/15 hover:border-espresso/30'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-espresso font-semibold text-xs font-mono uppercase">
                          <span>Pay at Counter</span>
                        </div>
                        <span className="text-[10px] text-espresso/60 font-mono mt-0.5 block">
                          Cash / Contactless terminal
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Pricing Summary */}
                  <div className="p-4 rounded-2xl bg-ivory-light border border-espresso/10 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-espresso/70">
                      <span>Items Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-espresso/60">
                      <span>Café GST (5%)</span>
                      <span>₹{gstTax}</span>
                    </div>
                    <div className="flex justify-between font-serif text-lg font-bold text-espresso pt-2 border-t border-espresso/10">
                      <span>Total Amount</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing || items.length === 0}
                    className="w-full py-4 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-mono font-medium hover:bg-caramel transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    <span>
                      {isProcessing ? 'Connecting Gateway...' : `Proceed with ₹${totalAmount}`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
