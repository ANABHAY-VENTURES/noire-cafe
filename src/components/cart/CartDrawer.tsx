import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
  onExploreMenu?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onExploreMenu }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    totalItems,
    subtotal,
    formattedSubtotal,
  } = useCart();

  const gstTax = Math.round(subtotal * 0.05); // 5% GST
  const finalTotal = subtotal + gstTax;
  const formattedFinalTotal = `₹${finalTotal.toLocaleString('en-IN')}`;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeCart}
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#121214] text-white shadow-2xl flex flex-col border-l border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#141416]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-champagne text-black flex items-center justify-center font-mono text-xs font-bold">
                    {totalItems}
                  </div>
                  <div>
                    <h2 className="font-sans text-xl font-bold text-white">
                      Your Order
                    </h2>
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-champagne block">
                      ATELIER TACTILE SERVICE
                    </span>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List / Empty State */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-champagne">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-sans text-xl font-bold text-white">
                        Your Order Is Empty
                      </h3>
                      <p className="text-xs text-white/50 max-w-xs mt-1 font-sans">
                        Select from our slow pour-over extractions, single-estate espressos, and fresh seasonal roasts.
                      </p>
                    </div>
                    {onExploreMenu && (
                      <button
                        onClick={() => {
                          closeCart();
                          onExploreMenu();
                        }}
                        className="mt-4 px-6 py-2.5 rounded-full bg-white text-black text-xs font-mono uppercase tracking-widest font-semibold hover:bg-champagne transition-colors"
                      >
                        Explore Menu
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map(({ product, quantity }) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-champagne/40 transition-colors"
                      >
                        {/* Thumbnail */}
                        <div className="w-18 h-18 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-sans text-sm font-bold text-white truncate">
                                {product.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(product.id)}
                                className="text-white/40 hover:text-red-400 transition-colors p-1"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="text-[9px] font-mono text-champagne uppercase block">
                              {product.category}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 border border-white/20 rounded-full px-2 py-0.5 bg-black/50">
                              <button
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                className="p-1 text-white/60 hover:text-white"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs w-4 text-center text-white font-bold">
                                {quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                className="p-1 text-white/60 hover:text-white"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Item Price */}
                            <span className="font-mono text-sm font-bold text-champagne">
                              ₹{(product.priceInr * quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#141416] space-y-4">
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span className="text-white font-medium">{formattedSubtotal}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Hospitality GST (5%)</span>
                      <span className="text-white font-medium">₹{gstTax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm font-sans pt-2 border-t border-white/10 font-bold text-white">
                      <span>Total Due</span>
                      <span className="font-mono text-xl text-champagne">{formattedFinalTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      closeCart();
                      onCheckout();
                    }}
                    className="w-full py-4 rounded-full bg-champagne text-black text-xs font-mono uppercase tracking-widest font-bold hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group"
                  >
                    <span>Proceed to Order ({formattedFinalTotal})</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <span className="text-[10px] font-mono text-center block text-white/40">
                    Complimentary sparkling water & tableside extraction timer included.
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
