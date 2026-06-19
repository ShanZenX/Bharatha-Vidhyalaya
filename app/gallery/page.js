"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setImages(data || []);
  };

  const getImageUrl = (path) => {
    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(path);

    return data.publicUrl;
  };

  const categories = [
    "All",
    "Events",
    "Sports",
    "Cultural Activities",
    "Annual Day",
    "Classroom Activities",
  ];

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter(
          (item) =>
            item.category === selectedCategory
        );

  return (
    <section className="py-20 md:pt-26 bg-gradient-to-b from-white via-yellow-50/30 to-white">
      <div className="container-custom">

        {/* Heading */}
        <div className="text-center mb-12">

          <span
            className="
              inline-block
              px-4
              py-2
              rounded-full
              bg-yellow-100
              text-yellow-700
              text-sm
              font-medium
              mb-4
            "
          >
            Memories & Moments
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
            School Gallery
          </h1>

          <p
            className="
              mt-4
              text-gray-600
              max-w-2xl
              mx-auto
            "
          >
            Explore our campus life, celebrations,
            achievements, sports activities and
            memorable school events.
          </p>

        </div>

        {/* Filter Buttons */}
        <div
          className="
            flex
            flex-wrap
            justify-center
            gap-3
            mb-12
          "
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`
                px-5 py-2.5
                rounded-full
                font-medium
                transition-all
                duration-300
                ${
                  selectedCategory === category
                    ? `
                      bg-gradient-to-r
                      from-yellow-400
                      via-yellow-500
                      to-yellow-400
                      text-black
                      shadow-lg
                    `
                    : `
                      bg-white
                      border
                      border-gray-200
                      text-gray-600
                      hover:border-yellow-400
                    `
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
          "
        >
          {filteredImages.map((item) => (
            <div
              key={item.id}
              className="
                group
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-500
              "
            >
              <div className="overflow-hidden">
                <img
                  src={getImageUrl(
                    item.storage_path
                  )}
                  alt={item.title}
                  className="
                    w-full
                    h-64
                    object-cover
                    group-hover:scale-110
                    transition-transform
                    duration-700
                  "
                />
              </div>

              <div className="p-5">

                <span
                  className="
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    bg-yellow-100
                    text-yellow-700
                  "
                >
                  {item.category}
                </span>

                <h3
                  className="
                    mt-3
                    text-lg
                    font-bold
                    text-slate-800
                  "
                >
                  {item.title}
                </h3>

              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">
              No images found in this category.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}