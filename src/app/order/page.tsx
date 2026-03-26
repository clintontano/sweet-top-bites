"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { menuItems, branches } from "@/lib/menu";
import { toast } from "sonner";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MapPin,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

function OrderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const branchSlug = searchParams.get("branch") || "";
  const branch = branches.find((b) => b.slug === branchSlug);

  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    customerName,
    setCustomerName,
    setBranch,
  } = useCartStore();

  const [cartOpen, setCartOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Set branch in store
  if (branch && useCartStore.getState().branch !== branch.name) {
    setBranch(branch.name);
  }

  const handleAddItem = (item: (typeof menuItems)[0]) => {
    addItem({ name: item.name, price: item.price, image: item.image });
    toast.success(`${item.name} added to cart!`, {
      duration: 2000,
    });
  };

  const handlePlaceOrder = () => {
    if (!customerName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setSubmitting(true);
    const orderId = `STB-${String(Math.floor(Math.random() * 99999) + 1).padStart(5, "0")}`;
    clearCart();
    router.push(`/order/confirmation?orderId=${orderId}`);
  };

  if (!branch) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-cream mb-4">
            Select a Branch
          </h1>
          <p className="text-cream/50 mb-8">
            Please choose a branch to start ordering
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {branches.map((b) => (
              <a
                key={b.slug}
                href={`/order?branch=${b.slug}`}
                className="bg-surface border border-white/10 rounded-2xl px-6 py-4 hover:border-primary/50 transition-all text-center"
              >
                <p className="font-heading text-cream">{b.name}</p>
                <p className="text-cream/40 text-sm mt-1">{b.address}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Branch Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl text-cream">
              {branch.name}
            </h1>
            <p className="text-cream/50 text-sm flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4 text-primary" />
              {branch.address}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setCartOpen(true)}
            className="relative bg-primary text-white font-heading px-5 py-3 rounded-2xl flex items-center gap-2 lg:hidden"
          >
            <ShoppingBag className="w-5 h-5" />
            Cart
            {itemCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {itemCount()}
              </span>
            )}
          </motion.button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Menu Grid */}
          <div className="flex-1">
            <h2 className="font-heading text-xl text-cream/70 mb-6">Menu</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {menuItems.map((item, i) => {
                const inCart = items.find((ci) => ci.name === item.name);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-surface rounded-[1.5rem] overflow-hidden border border-white/5 card-glow"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                        {inCart && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full"
                          >
                            {inCart.quantity} in cart
                          </motion.div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-heading text-base text-cream">
                            {item.name}
                          </h3>
                          <span className="text-primary font-heading text-lg">
                            ₵{item.price}
                          </span>
                        </div>
                        <p className="text-cream/40 text-sm mb-4">
                          {item.description}
                        </p>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddItem(item)}
                          className="w-full bg-primary/10 border border-primary/30 text-primary font-medium py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Desktop Cart Sidebar */}
          <div className="hidden lg:block w-96 shrink-0">
            <div className="sticky top-24">
              <CartPanel
                items={items}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                total={total()}
                customerName={customerName}
                setCustomerName={setCustomerName}
                onPlaceOrder={handlePlaceOrder}
                submitting={submitting}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-dark z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-4">
                <button
                  onClick={() => setCartOpen(false)}
                  className="mb-4 text-cream/50 hover:text-cream"
                >
                  <X className="w-6 h-6" />
                </button>
                <CartPanel
                  items={items}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                  total={total()}
                  customerName={customerName}
                  setCustomerName={setCustomerName}
                  onPlaceOrder={handlePlaceOrder}
                  submitting={submitting}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile floating cart button */}
      {itemCount() > 0 && !cartOpen && (
        <motion.button
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 left-4 right-4 bg-primary text-white font-heading py-4 rounded-2xl flex items-center justify-between px-6 z-30 lg:hidden shadow-[0_0_40px_rgba(255,107,0,0.3)]"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            View Cart ({itemCount()})
          </span>
          <span className="flex items-center gap-1">
            ₵{total().toFixed(2)} <ChevronRight className="w-4 h-4" />
          </span>
        </motion.button>
      )}
    </div>
  );
}

function CartPanel({
  items,
  updateQuantity,
  removeItem,
  total,
  customerName,
  setCustomerName,
  onPlaceOrder,
  submitting,
}: {
  items: { name: string; price: number; quantity: number; image: string }[];
  updateQuantity: (name: string, qty: number) => void;
  removeItem: (name: string) => void;
  total: number;
  customerName: string;
  setCustomerName: (name: string) => void;
  onPlaceOrder: () => void;
  submitting: boolean;
}) {
  return (
    <div className="bg-surface rounded-[1.5rem] border border-white/5 p-6">
      <h3 className="font-heading text-xl text-cream mb-4 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-primary" />
        Your Order
      </h3>

      {items.length === 0 ? (
        <p className="text-cream/40 text-sm py-8 text-center">
          Your cart is empty. Add some items!
        </p>
      ) : (
        <div className="space-y-3 mb-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 bg-dark/50 rounded-xl p-3"
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-cream text-sm font-medium truncate">
                    {item.name}
                  </p>
                  <p className="text-primary text-sm">
                    ₵{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.name, item.quantity - 1)
                    }
                    className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center text-cream/70 hover:text-cream"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm text-cream">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.name, item.quantity + 1)
                    }
                    className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center text-cream/70 hover:text-cream"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => removeItem(item.name)}
                    className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent/70 hover:text-accent ml-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className="border-t border-white/5 pt-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-cream/70">Subtotal</span>
              <span className="font-heading text-xl text-primary">
                ₵{total.toFixed(2)}
              </span>
            </div>

            <label className="block mb-4">
              <span className="text-cream/50 text-sm">Your Name</span>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1 w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:border-primary transition-colors"
              />
            </label>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onPlaceOrder}
              disabled={submitting}
              className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-heading py-4 rounded-xl hover:shadow-[0_0_30px_rgba(255,107,0,0.3)] transition-all disabled:opacity-50"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-cream/50 font-heading">
            Loading...
          </div>
        </div>
      }
    >
      <OrderContent />
    </Suspense>
  );
}
