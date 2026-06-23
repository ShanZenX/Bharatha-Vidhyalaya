"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [selectedIndex, setSelectedIndex] =
    useState(null);

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
    if (!path) return "";

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

  const openImage = (index) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === filteredImages.length - 1
        ? 0
        : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0
        ? filteredImages.length - 1
        : prev - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape")
        closeImage();

      if (e.key === "ArrowRight")
        nextImage();

      if (e.key === "ArrowLeft")
        prevImage();
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [selectedIndex, filteredImages]);

  return (
    <section className="py-20 md:pt-28 bg-gradient-to-b from-white via-yellow-50/30 to-white">

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
            Explore our campus life,
            celebrations, achievements,
            sports activities and
            memorable school events.
          </p>

        </div>

        {/* Category Filter */}

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
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-6
            gap-4
          "
        >
          {filteredImages.map(
            (item, index) => (
              <div
                key={item.id}
                onClick={() =>
                  openImage(index)
                }
                className="
                  group
                  overflow-hidden
                  rounded-xl
                  cursor-pointer
                  shadow-md
                  bg-white
                "
              >
                <img
                  src={getImageUrl(
                    item.storage_path
                  )}
                  alt={item.title}
                  className="
                    w-full
                    h-48
                    object-cover
                    group-hover:scale-110
                    transition-transform
                    duration-500
                  "
                />
              </div>
            )
          )}
        </div>

        {/* Empty State */}

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">
              No images found in this
              category.
            </p>
          </div>
        )}

      </div>

      {/* Fullscreen Lightbox */}

      {selectedIndex !== null && (
        <div
          className="
            fixed
            inset-0
            bg-black/95
            z-[9999]
            flex
            items-center
            justify-center
          "
        >
          {/* Close */}

          <button
            onClick={closeImage}
            className="
              absolute
              top-4
              right-6
              text-white
              text-5xl
              z-20
            "
          >
            ×
          </button>

          {/* Previous */}

          <button
            onClick={prevImage}
            className="
              absolute
              left-4
              md:left-8
              text-white
              text-5xl
              z-20
            "
          >
            ❮
          </button>

          {/* Current Image */}

          <img
            src={getImageUrl(
              filteredImages[selectedIndex]
                .storage_path
            )}
            alt={
              filteredImages[
                selectedIndex
              ].title
            }
            className="
              max-w-[90vw]
              max-h-[85vh]
              object-contain
            "
          />

          {/* Next */}

          <button
            onClick={nextImage}
            className="
              absolute
              right-4
              md:right-8
              text-white
              text-5xl
              z-20
            "
          >
            ❯
          </button>

          {/* Caption */}

          <div
            className="
              absolute
              bottom-6
              left-0
              right-0
              text-center
              text-white
              px-4
            "
          >
            <h3 className="text-xl font-bold">
              {
                filteredImages[
                  selectedIndex
                ].title
              }
            </h3>

            <p className="text-gray-300">
              {
                filteredImages[
                  selectedIndex
                ].category
              }
            </p>
          </div>
        </div>
      )}

    </section>
  );
}