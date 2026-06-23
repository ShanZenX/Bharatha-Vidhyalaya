"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ToppersPage() {
  const [toppers, setToppers] = useState([]);
  const [selectedClass, setSelectedClass] =
    useState("All");

  useEffect(() => {
    fetchToppers();
  }, []);

  const fetchToppers = async () => {
    const { data } = await supabase
      .from("toppers")
      .select("*")
      .order("class_name")
      .order("rank");

    setToppers(data || []);
  };

  const getImageUrl = (path) => {
    if (!path) return "/default-student.jpg";

    const { data } = supabase.storage
      .from("toppers")
      .getPublicUrl(path);

    return data.publicUrl;
  };

  const classes = [
    "All",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
  ];

  const filtered =
    selectedClass === "All"
      ? toppers
      : toppers.filter(
          (t) =>
            t.class_name === selectedClass
        );

  const grouped = filtered.reduce(
    (acc, topper) => {
      if (!acc[topper.class_name]) {
        acc[topper.class_name] = [];
      }

      acc[topper.class_name].push(topper);

      return acc;
    },
    {}
  );

  return (
    <section className="py-24 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <div className="container-custom">

        {/* Heading */}

        <div className="text-center mb-14">

          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full mb-4">
            Academic Excellence
          </span>

          <h1 className="font-heading text-5xl font-black bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
            School Toppers
          </h1>

          <p className="text-gray-600 mt-4">
            Celebrating our outstanding achievers.
          </p>

        </div>

        {/* Class Filter */}

        <div className="flex flex-wrap justify-center gap-3 mb-16">

          {classes.map((cls) => (
            <button
              key={cls}
              onClick={() =>
                setSelectedClass(cls)
              }
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                selectedClass === cls
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "bg-white shadow hover:bg-yellow-50"
              }`}
            >
              {cls}
            </button>
          ))}

        </div>

        {/* Toppers */}

        {Object.entries(grouped).map(
          ([className, students]) => (
            <div
              key={className}
              className="mb-20"
            >
              <h2 className="font-heading text-3xl font-bold text-center text-yellow-700 mb-8">
                {className}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

                {students.map((student) => (
                  <div
                    key={student.id}
                    className="
                      bg-white/30
                      backdrop-blur-lg
                      rounded-2xl
                      overflow-hidden
                      border
                      border-white/40
                      shadow-lg
                      hover:scale-105
                      hover:shadow-2xl
                      transition-all
                      duration-300
                    "
                  >
                    {/* Image */}

                    <div className="relative">

                      <img
                        src={getImageUrl(
                          student.photo_path
                        )}
                        alt={
                          student.student_name
                        }
                        className="
                          w-full
                          h-40
                          object-cover
                        "
                      />

                      <div
                        className="
                          absolute
                          top-2
                          right-2
                          bg-yellow-500
                          text-white
                          text-xs
                          font-bold
                          px-2
                          py-1
                          rounded-full
                        "
                      >
                        Rank #{student.rank}
                      </div>

                    </div>

                    {/* Content */}

                    <div className="p-3">

                      <div className="text-center text-2xl mb-2">
                        {student.rank === 1
                          ? "🥇"
                          : student.rank === 2
                          ? "🥈"
                          : "🥉"}
                      </div>

                      <div className="space-y-1 text-sm">

                        <p>
                          <span className="font-semibold text-yellow-700">
                            Name:
                          </span>{" "}
                          {student.student_name}
                        </p>

                        <p>
                          <span className="font-semibold text-yellow-700">
                            Percentage:
                          </span>{" "}
                          {student.percentage}
                        </p>

                        <p>
                          <span className="font-semibold text-yellow-700">
                            Academic Year:
                          </span>{" "}
                          {student.academic_year}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>
          )
        )}

      </div>
    </section>
  );
}