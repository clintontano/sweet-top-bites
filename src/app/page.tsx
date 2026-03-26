"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { branches, menuItems } from "@/lib/menu";
import { MapPin, ArrowRight, Clock, Flame } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center noise-overlay">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-darker to-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,107,0,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(229,23,63,0.1),transparent_50%)]" />

        {/* Floating food images */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -10 }}
          animate={{ opacity: 0.2, x: 0, rotate: -10 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute left-[-5%] top-[20%] w-64 h-64 rounded-[2rem] overflow-hidden hidden lg:block"
        >
          <Image src="/1.png" alt="" fill className="object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 0.2, x: 0, rotate: 10 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="absolute right-[-5%] bottom-[20%] w-64 h-64 rounded-[2rem] overflow-hidden hidden lg:block"
        >
          <Image src="/2.png" alt="" fill className="object-cover" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Image
              src="/logo.png"
              alt="Sweet Top Bites"
              width={100}
              height={100}
              className="mx-auto rounded-2xl"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl sm:text-7xl lg:text-8xl text-cream mb-4"
          >
            Sweet Top{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Bites
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-cream/70 mb-2 font-body"
          >
            Bold Flavours. Every Bite.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm sm:text-base text-cream/40 mb-10 font-body"
          >
            Premium street food from 3 branches across Accra
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="#branches"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-heading text-lg px-8 py-4 rounded-2xl hover:shadow-[0_0_40px_rgba(255,107,0,0.3)] transition-all duration-300 hover:scale-105"
            >
              <Flame className="w-5 h-5" />
              Order Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-cream/20 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1.5 h-3 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Branches Section */}
      <section id="branches" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-heading text-4xl sm:text-5xl text-cream mb-4"
            >
              Choose Your{" "}
              <span className="text-primary">Branch</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-cream/50 text-lg"
            >
              Select a location to start your order
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {branches.map((branch, i) => (
              <motion.div
                key={branch.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i + 1}
              >
                <Link href={`/order?branch=${branch.slug}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative bg-surface rounded-[1.5rem] overflow-hidden border border-white/5 card-glow transition-all duration-300"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={branch.image}
                        alt={branch.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-xl text-cream mb-2">
                        {branch.name}
                      </h3>
                      <p className="text-cream/50 text-sm mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {branch.address}
                      </p>
                      <p className="text-cream/40 text-sm">{branch.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                        Order from here <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                    {/* Hover bottom border */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-24 px-4 bg-darker/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-heading text-4xl sm:text-5xl text-cream mb-4"
            >
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Menu
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-cream/50 text-lg"
            >
              Fresh, bold, and made with love
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                custom={i}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-surface rounded-[1.5rem] overflow-hidden border border-white/5 card-glow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-heading text-lg text-cream">{item.name}</h3>
                      <span className="text-primary font-heading text-lg">
                        ₵{item.price}
                      </span>
                    </div>
                    <p className="text-cream/40 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mt-12"
          >
            <Link
              href="#branches"
              className="inline-flex items-center gap-2 bg-surface border border-primary/30 text-primary font-heading px-8 py-3 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300"
            >
              Start Your Order <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.png"
                  alt="Sweet Top Bites"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span className="font-heading text-lg text-cream">
                  Sweet Top Bites
                </span>
              </div>
              <p className="text-cream/40 text-sm">
                Bold Flavours. Every Bite. Serving premium street food across Accra.
              </p>
            </div>

            {branches.map((branch) => (
              <div key={branch.slug}>
                <h4 className="font-heading text-sm text-cream mb-3">
                  {branch.name}
                </h4>
                <p className="text-cream/40 text-sm flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {branch.address}
                </p>
                <p className="text-cream/40 text-sm flex items-center gap-2 mt-2">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  10:00 AM – 10:00 PM
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 text-center text-cream/30 text-sm">
            &copy; {new Date().getFullYear()} Sweet Top Bites. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
