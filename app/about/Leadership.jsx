import Image from "next/image";

const leaders = [
  {
    name: "Mr. K. Balasubramanian",
    designation: "Correspondent",
    qualification: "MA., M.Ed., BL",
    image: "/leadership/correspondent.jpg",
    message: `Education is the foundation for a successful future. Our aim is to provide quality education along with discipline, values, creativity, and confidence in every student.

We believe that every child has unique talents and abilities. With the support of dedicated teachers, modern learning methods, and a positive environment, we strive to help our students achieve excellence in academics and life.

Together with parents and teachers, we will continue to build responsible, knowledgeable, and successful young minds.`,
  },
  {
    name: "Mrs. B. Vijayalakshmi",
    designation: "Principal",
    qualification: "MA., B.Ed",
    image: "/leadership/principal.jpg",
    message: `Education is not just about gaining knowledge; it is about developing character, values, creativity, and confidence. Our school is committed to providing a safe, inspiring, and supportive learning environment for every student.

With the dedication of our teachers, cooperation of parents, and hard work of our students, we aim to achieve excellence in academics and all areas of life.

We encourage our students to dream big, learn continuously, and become responsible citizens of tomorrow.`,
  },
  {
    name: "Mr. M. G. Ramesh",
    designation: "Administrator",
    qualification: "MA., B.Ed., D.T.Ed",
    image: "/leadership/admin.jpg",
    message: `Today a Reader, Tomorrow a Leader.

Our school is dedicated to creating a strong foundation for students through quality education, discipline, and value-based learning. We believe that a positive educational environment helps every child discover their potential and achieve success.

With the combined efforts of management, teachers, parents, and students, we continue to provide excellent facilities and opportunities for holistic development.

Our commitment is to nurture young minds and prepare them to face the future with confidence and responsibility.`,
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
                text-center
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
             <p className="text-gray-600 text-center text-sm leading-relaxed text-left">
    {leader.message}
  </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}