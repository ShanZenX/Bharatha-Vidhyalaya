const rules = [
  "Respect yourself and others",
  "Be honest in all actions",
  "Maintain discipline and punctuality",
  "Take responsibility for your learning",
  "Protect school property",
  "Show kindness and compassion",
  "Strive for excellence every day",
  "Be a positive role model"
];

export default function GoldenRules() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">

        <p className="text-3xl  font-heading font-bold text-center text-yellow-900 pb-10">
          Our Golden Rules
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {rules.map((rule, index) => (
            <div
              key={index}
              className="
                glass-card
                p-6
                text-center
                hover:-translate-y-2
                transition-all
                duration-300
                border
                border-yellow-900!
              "
            >
              <div className="text-3xl mb-3">⭐</div>

              <p className="text-gray-700 font-medium">
                {rule}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}