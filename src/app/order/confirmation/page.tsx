"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Home, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "STB-00000";
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,0,0.08),transparent_60%)]" />

      {/* Confetti particles */}
      {showConfetti &&
        Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 1,
              y: -20,
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800),
              scale: 0,
            }}
            animate={{
              opacity: 0,
              y: typeof window !== "undefined" ? window.innerHeight : 800,
              rotate: Math.random() * 720,
              scale: 1,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.5,
              ease: "easeOut",
            }}
            className="fixed pointer-events-none z-0"
            style={{
              width: 8 + Math.random() * 8,
              height: 8 + Math.random() * 8,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              background:
                i % 3 === 0
                  ? "#FF6B00"
                  : i % 3 === 1
                  ? "#E5173F"
                  : "#FFF8F0",
            }}
          />
        ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full bg-surface rounded-[2rem] border border-white/5 p-8 text-center"
      >
        {/* Checkmark animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="mb-6"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CheckCircle className="w-10 h-10 text-primary" strokeWidth={2} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="font-heading text-3xl text-cream mb-2">
            Order Placed!
          </h1>
          <p className="text-cream/50 mb-6">
            Thank you for ordering from Sweet Top Bites
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-dark/50 rounded-2xl p-6 mb-6"
        >
          <p className="text-cream/50 text-sm mb-1">Order ID</p>
          <p className="font-heading text-2xl text-primary mb-4">{orderId}</p>

          <div className="flex items-center justify-center gap-2 text-cream/60">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm">
              Estimated wait: <strong className="text-cream">15–20 mins</strong>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-primary text-white font-heading py-3.5 rounded-xl hover:shadow-[0_0_30px_rgba(255,107,0,0.3)] transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/#branches"
            className="flex items-center justify-center gap-2 w-full bg-surface border border-white/10 text-cream/70 font-medium py-3.5 rounded-xl hover:border-primary/30 transition-all"
          >
            Order Again <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <Image
            src="/logo.png"
            alt="Sweet Top Bites"
            width={40}
            height={40}
            className="mx-auto rounded-lg opacity-30"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ConfirmationPage() {
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
      <ConfirmationContent />
    </Suspense>
  );
}
