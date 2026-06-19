"use client";

import CountUp from "react-countup";

export default function Achievements() {
  const stats = [
    {
      number: 1500,
      suffix: "+",
      title: "Students",
    },
    {
      number: 50,
      suffix: "+",
      title: "Qualified Teachers",
    },
    {
      number: 20,
      suffix: "+",
      title: "Years of Excellence",
    },
    {
      number: 100,
      suffix: "%",
      title: "Safe Environment",
    },
  ];

  return (
    <section
      className="
         py-24
    bg-gradient-to-r from-yellow-100 via-amber-50 to-yellow-100
      "
    >
      <div className="container-custom">

        {/* Section Header */}
        <div className="text-center mb-16">

          <span
            className="
              inline-block
              bg-yellow-100
              text-yellow-700
              px-4
              py-2
              rounded-full
              text-sm
              font-medium
              mb-4
            "
          >
            Our Achievements
          </span>
<br></br>
          <span
            className="
              font-heading
              text-4xl
              md:text-5xl
              lg:text-4xl
              font-black
              
              bg-clip-text
              text-black
              font-heading
            "
          >
            School Achievements
          </span>

          <p className="mt-5 text-black text-lg max-w-2xl mx-auto">
            Building a legacy of academic excellence,
            innovation and student success.
          </p>

        </div>

        {/* Glass Statistics Container */}
        <div
          className="
            bg-transparent
            backdrop-blur-xl
            border
            border-yellow-900!
            rounded-3xl
            shadow-2xl
            p-8
            md:p-10
          "
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {stats.map((stat, index) => (
              <div
                key={index}
                className="
                  text-center
                  relative
                "
              >
                {/* Divider */}
                {index !== stats.length - 1 && (
                  <div
                    className="
                      hidden md:block
                      absolute
                      top-1/2
                      right-0
                      -translate-y-1/2
                      h-16
                      w-px
                      bg-yellow-900
                    "
                  />
                )}

                <span
                  className="
                    text-4xl
                    md:text-5xl
                    font-bold
                    text-transparent
                    bg-clip-text
                  text-yellow-950
                    mb-2
                  "
                >
                  <CountUp
                    end={stat.number}
                    duration={3}
                  />
                  {stat.suffix}
                </span>

                <p
                  className="
                    text-black/50
                    font-medium
                    pt-2
                  "
                >
                  {stat.title}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}