"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [showMore, setShowMore] = useState(false);

  return (
    <footer className="bg-yellow-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Main Footer */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left Section */}
          <div>
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="Bharatha Vidhyalaya Logo"
                className="w-40 h-40 object-contain"
              />

              <div>
                <span
                  className="
                    text-2xl
                    md:text-3xl
                    font-bold
                    leading-tight
                    bg-gradient-to-b
                    from-white
                    via-gray-200
                    to-yellow-900
                    bg-clip-text
                    text-transparent
                  "
                >
                  Bharatha Vidhyalaya
                </span>

                <p className="text-lg text-yellow-300">
                  Matriculation Higher Secondary School
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-white/95">
              <p>
                📍 Bharatha Vidhyalaya Matriculation Higher Secondary School
              </p>

              <p>
                ✉️{" "}
                <a
                  href="mailto:balabvm57@gmail.com"
                  className="text-white/95! hover:text-yellow-300! text-decoration-none transition no-underline"
                >
                  balabvm57@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Right Section - Map */}
          <div>
            <div className="overflow-hidden rounded-2xl shadow-xl border border-yellow-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.92261004788!2d80.18590517498836!3d12.718471587574095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525154da245d7b%3A0xaf59658c0755a58e!2sBharatha%20Vidhyalaya%20Matriculation%20School!5e0!3m2!1sen!2sin!4v1781801430577!5m2!1sen!2sin"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
              />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-yellow-400/30 mt-8 pt-5 text-center">

          <p className="text-slate-100 text-sm">
            © {new Date().getFullYear()} Bharatha Vidhyalaya
            Matriculation Higher Secondary School.
            All Rights Reserved.
          </p>

          {/* Show More / Admin Login */}
          <div className="mt-3">
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-xs text-slate-400 hover:text-white transition"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>

            {showMore && (
              <div className="mt-2">
                <Link
                  href="/login"
                  className="text-xs text-slate-500 hover:text-yellow-300 transition"
                >
                  Admin Login
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>
    </footer>
  );
}