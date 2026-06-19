export default function TransformativeEducation() {
  return (
    <section className="py-20 bg-yellow-950/90">
      <div className="container-custom">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          <div>
            <p className="text-3xl font-bold heading-font text-yellow-200 mb-6">
              Transformative Education
            </p>

            <p className="text-yellow-50/90 leading-relaxed">
              We believe education is more than acquiring knowledge.
              It is about transforming lives, building confidence,
              encouraging creativity, and preparing students to thrive
              in a rapidly changing world.
            </p>

            <p className="mt-4 text-yellow-50/90 leading-relaxed">
              Through innovative teaching methods, value-based learning,
              and holistic development, we empower students to become
              responsible citizens and lifelong learners.
            </p>
          </div>

          <div
            className="
              bg-yellow-900/30
              backdrop-blur-sm
              border
              border-yellow-700/40
              rounded-3xl
              p-8
              mx-20!
              justify-center
              items-center
              flex
              flex-col
            "
          >
            <p className="text-3xl font-bold text-yellow-200 mb-4">
              Our Focus
            </p>

            <ul className="space-y-4 text-yellow-50/90">
              <li>✓ Academic Excellence</li>
              <li>✓ Character Building</li>
              <li>✓ Leadership Skills</li>
              <li>✓ Critical Thinking</li>
              <li>✓ Innovation & Creativity</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}