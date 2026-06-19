"use client";

import {
  FaChalkboardTeacher,
  FaLaptopCode,
  FaBus,
  FaShieldAlt,
  FaBook,
  FaFutbol,
} from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaChalkboardTeacher />,
      title: "Experienced Teachers",
      desc: "Dedicated educators focused on every student's success and overall development.",
    },
    {
      icon: <FaLaptopCode />,
      title: "Smart Classrooms",
      desc: "Technology-enabled learning environment for interactive education.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Safe Campus",
      desc: "CCTV surveillance and secure infrastructure for student safety.",
    },
    {
      icon: <FaBus />,
      title: "Transport Facility",
      desc: "Safe and reliable transportation covering major routes.",
    },
    {
      icon: <FaBook />,
      title: "Quality Education",
      desc: "Strong academic foundation with innovative teaching methods.",
    },
    {
      icon: <FaFutbol />,
      title: "Sports & Activities",
      desc: "Balanced focus on academics, sports, arts and extracurricular activities.",
    },
  ];

  return (
    <section className="py-24 bg-yellow-950/90 from-black via-black to-black">
      <div className="container-custom">

        {/* Section Header */}
        <div className="text-center mb-16">

          <span
            className="
              inline-block
              bg-yellow-100/80
              text-yellow-700
              px-4
              py-2
              rounded-full
              text-sm
              font-medium
              mb-4
            "
          >
            Why Parents Choose Us
          </span>
<br />
          <span
            className="
              font-heading
              text-4xl
              md:text-xl
              lg:text-4xl
              font-black
              bg-gradient-to-r
              from-yellow-600
              via-yellow-500
              to-yellow-700
              bg-clip-text
              text-transparent
              text-white
            "
          >
            Why Choose Us
          </span>

          <p
            className="
              mt-5
              max-w-3xl
              mx-auto
              text-lg
                            text-white/80

            "
          >
            We nurture young minds through quality education,
            innovation, discipline, leadership and holistic development.
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  items-stretch">

          {features.map((item, index) => (
            <div
              key={index}
              className="
                h-full
                flex
                flex-col
                group
                relative
                overflow-hidden

                rounded-3xl
                p-8

                bg-[#ffffff00]
                backdrop-blur-lg

                border
                border-yellow-400/30

                shadow-xl
                shadow-yellow-500/10

                hover:bg-white/20
                hover:border-yellow-400/60
                hover:shadow-2xl
                hover:shadow-yellow-500/20
                hover:-translate-y-3

                transition-all
                duration-500
              "
            >
              {/* Gloss Effect */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-white/20
                  via-transparent
                  to-transparent
                  pointer-events-none
                "
              />

              {/* Icon */}
              <div
                className="
                  relative
                  text-5xl
                  text-yellow-400
                  mb-6
                  group-hover:scale-110
                  transition-transform
                  duration-300
                "
              >
                {item.icon}
              </div>

              {/* Title */}
              <span
                className="
                  relative
                  font-heading
                  text-2xl
                
                  mb-3
                                text-white
                                font-bold


                "
              >
                {item.title}
              </span>

              {/* Description */}
              <p
                className="
                  relative
                  text-white/80
                  leading-relaxed
                  flex-grow

                "
              >
                {item.desc}
              </p>

              {/* Bottom Gradient Line */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-1
                  w-0
                  bg-gradient-to-r
                  from-yellow-400
                  via-yellow-500
                  to-yellow-600
                  group-hover:w-full
                  transition-all
                  duration-500
                "
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}