"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/school.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Hero Content */}
      <div className="relative z-10 mt-6 flex flex-col items-center justify-center h-full px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="bg-white/20  backdrop-blur-md px-5 py-2 rounded-full text-sm md:text-base border border-white/30">
            🎓 Admissions Open for 2026–27
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-heading font-extrabold text-5xl md:text-9xl  leading-tight max-w-6xl"
        >
        <p
  className="
    font-heading
    mt-0
    md:pt-6
    md:pb-6
    text-5xl
    md:text-8xl
    font-black
    leading-tight
    bg-gradient-to-b
    from-white
    via-white
    to-yellow-900
    bg-clip-text
    text-transparent
  "
  // style={{
  //   textShadow:
  //     "0 8px 15px rgba(0,0,0,0.35)",
  // }}
>
  Bharatha Vidyalaya
</p>
          <p className="font-heading text-2xl md:text-3xl font-bold">
            {" "}
           Matriculation Higher Secondary School{" "}
          </p>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg md:text-2xl max-w-3xl text-gray-200"
        >
          Empowering young minds through academic excellence, character
          development, innovation, and lifelong learning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/about"
            className="
    text-decoration-none
    bg-white/10
    backdrop-blur-lg
    border border-white/20
    shadow-lg
    px-6 py-3
    rounded-xl
    font-semibold
    text-white
    hover:bg-white/25
    hover:border-white/40
    transition-all
    duration-300
  "
          >
            Explore School
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white animate-bounce z-20">
        ↓
      </div>
    </section>
  );
}
