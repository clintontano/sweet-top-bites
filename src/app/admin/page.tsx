"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Lock,
  LogOut,
  ShoppingBag,
  Clock,
  DollarSign,
  AlertCircle,
  ChefHat,
  CheckCircle2,
  Package,
  RefreshCw,
} from "lucide-react";

const ADMIN_PIN = "2025";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  orderId: string;
  branch: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}

const statusConfig: Record<
  string,
  { color: string; bg: string; icon: React.ReactNode; next: string | null }
> = {
  Pending: {
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/20",
    icon: <Clock className="w-3.5 h-3.5" />,
    next: "Preparing",
  },
  Preparing: {
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
    icon: <ChefHat className="w-3.5 h-3.5" />,
    next: "Ready",
  },
  Ready: {
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
    icon: <Package className="w-3.5 h-3.5" />,
    next: "Completed",
  },
  Completed: {
    color: "text-cream/40",
    bg: "bg-white/5 border-white/10",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    next: null,
  },
};

const SAMPLE_ORDERS: Order[] = [
  {
    id: 1,
    orderId: "STB-00001",
    branch: "Legon Shell",
    customerName: "Kwame A.",
    items: [
      { name: "Chicken Burger", price: 55, quantity: 2 },
      { name: "Fully Loaded Fries", price: 40, quantity: 1 },
    ],
    total: 150,
    status: "Pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    orderId: "STB-00002",
    branch: "A&C Corner",
    customerName: "Ama B.",
    items: [
      { name: "Chicken Shawarma", price: 50, quantity: 1 },
      { name: "Hot Dog", price: 35, quantity: 2 },
    ],
    total: 120,
    status: "Preparing",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    orderId: "STB-00003",
    branch: "Adabraka",
    customerName: "Kofi M.",
    items: [{ name: "Chicken Quesadillas", price: 60, quantity: 1 }],
    total: 60,
    status: "Ready",
    createdAt: new Date().toISOString(),
  },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("stb-admin-auth");
    if (saved === "true") setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (authenticated) {
      setLoading(true);
      setTimeout(() => {
        setOrders(SAMPLE_ORDERS);
        setLoading(false);
      }, 500);
    }
  }, [authenticated]);

  const handleLogin = () => {
    if (pin === ADMIN_PIN) {
      setAuthenticated(true);
      localStorage.setItem("stb-admin-auth", "true");
      setPinError(false);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 2000);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("stb-admin-auth");
    setPin("");
  };

  const updateStatus = (id: number, status: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  // PIN Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-sm w-full bg-surface rounded-[2rem] border border-white/5 p-8 text-center"
        >
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="Sweet Top Bites"
              width={60}
              height={60}
              className="mx-auto rounded-xl mb-4"
            />
            <h1 className="font-heading text-2xl text-cream">Admin Login</h1>
            <p className="text-cream/40 text-sm mt-1">
              Enter PIN to access dashboard
            </p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" />
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter PIN"
                className={`w-full bg-dark/50 border rounded-xl pl-12 pr-4 py-3.5 text-cream text-center text-2xl tracking-[0.5em] placeholder-cream/20 transition-colors ${
                  pinError ? "border-accent" : "border-white/10"
                }`}
              />
            </div>
            <AnimatePresence>
              {pinError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-accent text-sm mt-2 flex items-center justify-center gap-1"
                >
                  <AlertCircle className="w-3.5 h-3.5" /> Incorrect PIN
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-heading py-3.5 rounded-xl hover:shadow-[0_0_30px_rgba(255,107,0,0.3)] transition-all"
          >
            Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Filter orders
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.branch === filter);

  // Today's stats
  const today = new Date().toDateString();
  const todaysOrders = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === today
  );
  const pendingCount = todaysOrders.filter(
    (o) => o.status === "Pending"
  ).length;
  const revenue = todaysOrders.reduce((sum, o) => sum + o.total, 0);

  const branchTabs = [
    { key: "all", label: "All" },
    { key: "Legon Shell", label: "Legon Shell" },
    { key: "A&C Corner", label: "A&C Corner" },
    { key: "Adabraka", label: "Adabraka" },
  ];

  return (
    <div className="min-h-screen">
      {/* Admin Header */}
      <div className="bg-surface border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Sweet Top Bites"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <div>
              <h1 className="font-heading text-lg text-cream">
                Admin Dashboard
              </h1>
              <p className="text-cream/40 text-xs">Sweet Top Bites</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setOrders(SAMPLE_ORDERS)}
              disabled={loading}
              className="p-2 rounded-xl bg-dark/50 border border-white/10 text-cream/50 hover:text-primary transition-colors"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium hover:bg-accent/20 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface rounded-2xl border border-white/5 p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <span className="text-cream/50 text-sm">Orders Today</span>
            </div>
            <p className="font-heading text-3xl text-cream">
              {todaysOrders.length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface rounded-2xl border border-white/5 p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-cream/50 text-sm">Pending</span>
            </div>
            <p className="font-heading text-3xl text-cream">{pendingCount}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface rounded-2xl border border-white/5 p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-cream/50 text-sm">Revenue Today</span>
            </div>
            <p className="font-heading text-3xl text-cream">
              ₵{revenue.toFixed(2)}
            </p>
          </motion.div>
        </div>

        {/* Branch Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {branchTabs.map((tab) => (
            <motion.button
              key={tab.key}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFilter(tab.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filter === tab.key
                  ? "bg-primary text-white"
                  : "bg-surface border border-white/10 text-cream/50 hover:text-cream hover:border-white/20"
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-cream/30"
              >
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-heading text-lg">No orders yet</p>
              </motion.div>
            ) : (
              filteredOrders.map((order) => {
                const config = statusConfig[order.status] || statusConfig.Pending;
                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-surface rounded-2xl border border-white/5 p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-heading text-primary text-sm">
                            {order.orderId}
                          </span>
                          <span className="text-cream/30 text-xs">|</span>
                          <span className="text-cream/50 text-sm">
                            {order.branch}
                          </span>
                          <span className="text-cream/30 text-xs">|</span>
                          <span className="text-cream/50 text-sm">
                            {order.customerName}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {order.items.map((item: OrderItem, idx: number) => (
                            <span
                              key={idx}
                              className="bg-dark/50 text-cream/60 text-xs px-2.5 py-1 rounded-lg"
                            >
                              {item.quantity}x {item.name}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-cream/30">
                          <span>
                            {new Date(order.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <span className="font-heading text-cream/50">
                            ₵{order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${config.bg} ${config.color}`}
                        >
                          {config.icon}
                          {order.status}
                        </span>
                        {config.next && (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              updateStatus(order.id, config.next!)
                            }
                            className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-all"
                          >
                            → {config.next}
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
