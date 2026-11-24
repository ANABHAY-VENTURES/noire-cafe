import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, clearCart } = useCart();
  const [diningOption, setDiningOption] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 03 · Slow Bar');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'counter'>('upi');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const gstTax = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + gstTax;

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate luxury transaction
    setTimeout(() => {
      const generatedId = `NOIRE-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 1400);
  };

  const handleFinish = () => {
    setOrderComplete(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/70 backdrop-blur-sm overflow-y-auto">
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

            {orderComplete ? (
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
                    ORDER CONFIRMED · {orderId}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-normal text-espresso">
                    Extraction In Progress.
                  </h3>
                  <p className="text-xs text-espresso/70 max-w-sm mx-auto mt-2 font-sans">
                    Your single-origin coffee and artisanal bakes are being calibrated by our head barista.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="p-6 rounded-2xl bg-ivory-light border border-espresso/10 max-w-md mx-auto text-left space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-espresso/10 pb-2">
                    <span className="text-espresso/60">Order Reference</span>
                    <span className="font-semibold text-espresso">{orderId}</span>
                  </div>
                  <div className="flex justify-between border-b border-espresso/10 pb-2">
                    <span className="text-espresso/60">Service Format</span>
                    <span className="text-espresso">
                      {diningOption === 'dine-in' ? tableNumber : 'Express Takeaway'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-espresso/10 pb-2">
                    <span className="text-espresso/60">Estimated Brew Time</span>
                    <span className="text-olive font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>7–10 Minutes</span>
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 font-sans text-sm font-semibold">
                    <span>Paid in Full</span>
                    <span className="font-serif text-lg text-caramel">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleFinish}
                    className="px-8 py-3.5 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-medium hover:bg-caramel transition-colors shadow-md"
                  >
                    Return to Café Menu
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Checkout Form */
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-olive block mb-1">
                    NOIRÉ SERVICE CHECKOUT
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso">
                    Finalize Your Café Order
                  </h3>
                  <p className="text-xs text-espresso/60 mt-1">
                    Review your items and select your preferred table or takeaway arrangement.
                  </p>
                </div>

                <form onSubmit={handleProcessOrder} className="space-y-5">
                  {/* Dining Option Toggle */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-2">
                      Dining Preference
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDiningOption('dine-in')}
                        className={`py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all ${
                          diningOption === 'dine-in'
                            ? 'bg-espresso text-ivory border-espresso shadow-sm'
                            : 'bg-ivory-light text-espresso/70 border-espresso/10 hover:border-espresso/30'
                        }`}
                      >
                        Table Service (Dine-in)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDiningOption('takeaway')}
                        className={`py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all ${
                          diningOption === 'takeaway'
                            ? 'bg-espresso text-ivory border-espresso shadow-sm'
                            : 'bg-ivory-light text-espresso/70 border-espresso/10 hover:border-espresso/30'
                        }`}
                      >
                        Curated Takeaway
                      </button>
                    </div>
                  </div>

                  {/* Table Selection / Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {diningOption === 'dine-in' ? (
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                          Table Location
                        </label>
                        <select
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-xs text-espresso focus:outline-none focus:border-caramel font-mono"
                        >
                          <option>Table 01 · North Window Lounge</option>
                          <option>Table 02 · Courtyard Olive Tree</option>
                          <option>Table 03 · Slow Bar</option>
                          <option>Table 04 · Reading Nook</option>
                          <option>Table 05 · Terrazzo High Counter</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                          Pickup Contact Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-xs text-espresso focus:outline-none focus:border-caramel font-mono"
                        >
                        </input>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                        Guest Name
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Aarav Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-ivory-light border border-espresso/15 text-xs text-espresso focus:outline-none focus:border-caramel font-sans"
                      />
                    </div>
                  </div>

                  {/* Special Notes */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                      Barista Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="e.g. Extra dry oat foam, pour hot water on the side"
                      className="w-full px-4 py-2.5 rounded-xl bg-ivory-light border border-espresso/15 text-xs text-espresso focus:outline-none focus:border-caramel"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          paymentMethod === 'upi'
                            ? 'bg-espresso text-ivory border-espresso shadow-sm'
                            : 'bg-ivory-light text-espresso/70 border-espresso/10 hover:border-espresso/30'
                        }`}
                      >
                        <span className="block text-xs font-mono font-semibold">Instant UPI</span>
                        <span className="text-[10px] opacity-75">GooglePay / QR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          paymentMethod === 'card'
                            ? 'bg-espresso text-ivory border-espresso shadow-sm'
                            : 'bg-ivory-light text-espresso/70 border-espresso/10 hover:border-espresso/30'
                        }`}
                      >
                        <span className="block text-xs font-mono font-semibold">Tap Card</span>
                        <span className="text-[10px] opacity-75">Visa / MC / Amex</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('counter')}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          paymentMethod === 'counter'
                            ? 'bg-espresso text-ivory border-espresso shadow-sm'
                            : 'bg-ivory-light text-espresso/70 border-espresso/10 hover:border-espresso/30'
                        }`}
                      >
                        <span className="block text-xs font-mono font-semibold">Pay at Bar</span>
                        <span className="text-[10px] opacity-75">Upon Departure</span>
                      </button>
                    </div>
                  </div>

                  {/* Items Brief */}
                  <div className="p-4 rounded-xl bg-ivory-dark/50 border border-espresso/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-espresso/70">
                      {items.length} Distinct Items · Subtotal ₹{subtotal.toLocaleString('en-IN')} + GST ₹{gstTax}
                    </span>
                    <span className="font-serif text-lg font-medium text-caramel">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isProcessing || items.length === 0}
                      className="w-full py-4 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-medium hover:bg-caramel transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-ivory border-t-transparent rounded-full animate-spin" />
                          <span>Authorizing Order...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm & Place Order (₹{totalAmount.toLocaleString('en-IN')})</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
