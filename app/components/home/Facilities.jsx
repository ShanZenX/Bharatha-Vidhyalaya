"use client";

export default function Facilities() {
  const facilities = [
    {
      title: "Library",
      image: "/facilities/library.jpg",
    },
    {
      title: "Computer Lab",
      image: "/facilities/computer-lab.jpg",
    },
    {
      title: "Science Lab",
      image: "/facilities/science-lab.jpg",
    },
    {
      title: "Playground",
      image: "/facilities/playground.jpg",
    },
  ];

  return (
    <section className="pb-10 pt-10 bg-gradient-to-r from-yellow-100 via-amber-50 to-yellow-100">
      {" "}
      <div className="container-custom">
        {/* Header */}
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
            Modern Learning Environment
          </span>
<br/>
          <span
            className="
              font-heading
              text-4xl
              md:text-5xl
              lg:text-4xl
              font-black
              text-black
              bg-clip-text
              text-transparent
            "
          >
            Our Facilities
          </span>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto text-lg">
            Our campus is equipped with modern facilities that inspire learning,
            creativity, and holistic development.
          </p>
        </div>

        {/* Facility Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                bg-white/80
                backdrop-blur-xl
                border
                border-yellow-200/60
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-500
              "
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="
                    w-full
                    h-72
                    object-cover
                    group-hover:scale-110
                    transition-transform
                    duration-700
                  "
                />
              </div>

              {/* Overlay */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/20
                  to-transparent
                "
              />

              {/* Title */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-6
                "
              >
                <h3
                  className="
                    text-white
                    text-2xl
                    font-heading
                    font-bold
                  "
                >
                  {facility.title}
                </h3>

                <div
                  className="
                    mt-2
                    h-1
                    w-12
                    bg-gradient-to-r
                    from-yellow-400
                    to-yellow-600
                    group-hover:w-24
                    transition-all
                    duration-500
                  "
                />
              </div>

              {/* Gloss Effect */}
              <div
                className="
                  absolute
                  top-0
                  left-0
                  w-full
                  h-20
                  bg-gradient-to-b
                  from-white/30
                  to-transparent
                  pointer-events-none
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
