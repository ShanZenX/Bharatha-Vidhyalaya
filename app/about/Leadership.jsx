import Image from "next/image";

const leaders = [
  {
    name: "Mr. K. Balasubramanian",
    designation: "Correspondent",
    qualification: "MA., M.Ed., BL",
    image: "/leadership/correspondent.jpg",
  },
  {
    name: "Mrs. B. Vijayalakshmi",
    designation: "Principal",
    qualification: "MA., B.Ed",
    image: "/leadership/principal.jpg",
  },
  {
    name: "Mr. M. G. Ramesh",
    designation: "Administrator",
    qualification: "MA., B.Ed., D.T.Ed",
    image: "/leadership/admin.jpg",
  },
];

export default function Leadership() {
  return (
    <section className=" mb-20 bg-white">
      <div className="container-custom">

        <div className="text-center mb-14">
          <span className=" heading-font font-extrabold text-4xl font-bold text-yellow-900">
            Leadership Team
          </span>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our leadership team is committed to fostering academic
            excellence, strong values, and holistic development for
            every student.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="
                glass-card
                bg-yellow-100/10!
                p-8
                rounded-3xl
                text-center
                hover:-translate-y-2
                transition-all
                duration-300
                border
                border-yellow-900!
              ">
              <div className="relative w-40 h-40 mx-auto mb-6">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="
                    rounded-full
                    object-cover
                 
                  "
                />
              </div>

              <span
                className="
                  inline-block
                  px-4
                  py-1
                  rounded-full
                  bg-yellow-100
                  text-yellow-900
                  font-semibold
                  text-sm
                "
              >
                {leader.designation}
              </span>

              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                {leader.name}
              </h3>

              <p className="mt-2 text-gray-600">
                {leader.qualification}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}