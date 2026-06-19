"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdmissionsPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    student_name: "",
    father_name: "",
    mobile: "",
    class_applied: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase
        .from("admissions")
        .insert([form]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push(
      "/admissions/thank-you"
    );
  };

  return (
  <section className="py-24 bg-gradient-to-br from-yellow-50 via-white to-amber-100">
    <div className="container-custom">

      {/* Heading */}
      <div className="text-center mb-12">

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
          🎓 Admissions Open 2026–27
        </span>

        <h1
          className="
            font-heading
            text-4xl
            md:text-6xl
            font-black

            bg-gradient-to-r
            from-yellow-600
            via-yellow-500
            to-yellow-700

            bg-clip-text
            text-transparent
          "
        >
          Admission Form
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Begin your child's journey with Bharatha Vidhyalaya
          Matriculation Higher Secondary School.
        </p>

      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="
          max-w-3xl
          mx-auto

          bg-white/70
          backdrop-blur-xl

          border
          border-yellow-200

          rounded-3xl

          shadow-2xl

          p-6
          md:p-10
        "
      >

        <div className="grid md:grid-cols-2 gap-6">

          {/* Student Name */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Student Name
            </label>

            <input
              name="student_name"
              required
              onChange={handleChange}
              placeholder="Enter student name"
              className="
                w-full
                px-4
                py-3

                rounded-xl
                border

                border-yellow-200
                bg-white/80

                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            />
          </div>

          {/* Father Name */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Father Name
            </label>

            <input
              name="father_name"
              required
              onChange={handleChange}
              placeholder="Enter father name"
              className="
                w-full
                px-4
                py-3

                rounded-xl
                border

                border-yellow-200
                bg-white/80

                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Mobile Number
            </label>

            <input
              name="mobile"
              required
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="
                w-full
                px-4
                py-3

                rounded-xl
                border

                border-yellow-200
                bg-white/80

                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            />
          </div>

          {/* Class */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Class Applying For
            </label>

            <select
              name="class_applied"
              required
              onChange={handleChange}
              className="
                w-full
                px-4
                py-3

                rounded-xl
                border

                border-yellow-200
                bg-white/80

                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            >
              <option value="">
                Select Class
              </option>

              <option>Pre KG</option>
              <option>LKG</option>
              <option>UKG</option>

              <option>Class I</option>
              <option>Class II</option>
              <option>Class III</option>
              <option>Class IV</option>
              <option>Class V</option>

              <option>Class VI</option>
              <option>Class VII</option>
              <option>Class VIII</option>

              <option>Class IX</option>
              <option>Class X</option>

              <option>Class XI</option>
              <option>Class XII</option>
            </select>
          </div>

        </div>

        {/* Submit Button */}
        <div className="text-center mt-10">

          <button
            disabled={loading}
            className="
              px-10
              py-4

              rounded-full

              bg-gradient-to-r
              from-yellow-400
              via-yellow-500
              to-yellow-400

              text-black
              font-bold

              shadow-lg

              hover:scale-105
              transition-all
              duration-300
            "
          >
            {loading
              ? "Submitting..."
              : "🎓 Submit Application"}
          </button>

        </div>

      </form>

    </div>
  </section>
);
}