"use client";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <section className="py-24 bg-gradient-to-br from-yellow-50 via-white to-amber-100">
      <div className="container-custom">

        {/* Heading */}
        <div className="text-center mb-16">

          <span
            className="
              inline-block
              px-4 py-2
              rounded-full
              bg-yellow-100
              text-yellow-700
              text-sm
              font-medium
              mb-4
            "
          >
            Get In Touch
          </span>

          <p
            className="
              font-heading
              text-4xl
              md:text-4xl
              font-black

              bg-gradient-to-r
              from-yellow-600
              via-yellow-500
              to-yellow-700

              bg-clip-text
              text-transparent
            "
          >
            Contact Us
          </p>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We are always happy to answer your questions
            regarding admissions, academics and school activities.
          </p>

        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Address */}
          <div
            className="
              bg-white/70
              backdrop-blur-xl
              border border-yellow-900!
              rounded-3xl
              p-8
              shadow-lg
            "
          >
            <FaMapMarkerAlt
              className="text-yellow-500 mb-4"
              size={35}
            />

            <h3 className="font-heading text-2xl font-bold mb-3">
              School Address
            </h3>

            <p className="text-gray-600">
              Bharatha Vidhyalaya Matriculation
              Higher Secondary School
            </p>

            <p className="text-gray-600 mt-2">
              Chennai, Tamil Nadu, India
            </p>
          </div>

          {/* Phone */}
          <div
            className="
              bg-white/70
              backdrop-blur-xl
              border border-yellow-900!
              rounded-3xl
              p-8
              shadow-lg
            "
          >
            <FaPhoneAlt
              className="text-yellow-500 mb-4"
              size={35}
            />

            <h3 className="font-heading text-2xl font-bold mb-3">
              Phone Number
            </h3>

            <p className="text-gray-600">
              +91 98765 43210
            </p>

            <p className="text-gray-600 mt-2">
              Available during school hours
            </p>
          </div>

          {/* Email */}
          <div
            className="
              bg-white/70
              backdrop-blur-xl
              border border-yellow-900!
              rounded-3xl
              p-8
              shadow-lg
            "
          >
            <FaEnvelope
              className="text-yellow-500 mb-4"
              size={35}
            />

            <h3 className="font-heading text-2xl font-bold mb-3">
              Email Address
            </h3>

            <p className="text-gray-600">
              balabvm57@gmail.com
            </p>

            <p className="text-gray-600 mt-2">
              We usually reply within 24 hours
            </p>
          </div>

          {/* Timing */}
          <div
            className="
              bg-white/70
              backdrop-blur-xl
              border border-yellow-900!
              rounded-3xl
              p-8
              shadow-lg
            "
          >
            <FaClock
              className="text-yellow-500 mb-4"
              size={35}
            />

            <h3 className="font-heading text-2xl font-bold mb-3">
              School Hours
            </h3>

            <p className="text-gray-600">
              Monday - Saturday
            </p>

            <p className="text-gray-600 mt-2">
              8:30 AM - 4:00 PM
            </p>
          </div>

        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            We look forward to welcoming you to our school community.
          </p>
        </div>

      </div>
    </section>
  );
}