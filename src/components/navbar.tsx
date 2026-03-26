"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const itemCount = useCartStore((s) => s.itemCount());
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <nav className="sticky top-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Sweet Top Bites"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="font-heading text-lg text-cream hidden sm:block">
            Sweet Top Bites
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-cream/70 hover:text-primary transition-colors text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href="/#branches"
            className="text-cream/70 hover:text-primary transition-colors text-sm font-medium"
          >
            Branches
          </Link>
          <Link href="/order" className="relative group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-xl bg-surface hover:bg-surface-light transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-primary" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
