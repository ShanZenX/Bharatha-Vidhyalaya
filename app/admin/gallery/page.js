"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function GalleryAdmin() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Events");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setImages(data || []);
    }
  };

  const getImageUrl = (path) => {
    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(path);

    return data.publicUrl;
  };

  const uploadImage = async () => {
    try {
      if (!title.trim()) {
        alert("Please enter image title");
        return;
      }

      if (!file) {
        alert("Please select an image");
        return;
      }

      setLoading(true);

      const extension =
        file.name.split(".").pop();

      const fileName =
        `${Date.now()}.${extension}`;

      console.log("Uploading:", fileName);

      const { data: uploadData, error: uploadError } =
        await supabase.storage
          .from("gallery")
          .upload(fileName, file, {
            upsert: false,
          });

      console.log(uploadData);
      console.log(uploadError);

      if (uploadError) {
        alert(uploadError.message);
        setLoading(false);
        return;
      }

      const { error: dbError } =
        await supabase
          .from("gallery")
          .insert([
            {
              title,
              category,
              storage_path: fileName,
            },
          ]);

      if (dbError) {
        alert(dbError.message);
        setLoading(false);
        return;
      }

      alert("Image uploaded successfully");

      setTitle("");
      setCategory("Events");
      setFile(null);

      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    setLoading(false);
  };

  const deleteImage = async (image) => {
    const confirmDelete = confirm(
      "Delete this image?"
    );

    if (!confirmDelete) return;

    await supabase.storage
      .from("gallery")
      .remove([image.storage_path]);

    await supabase
      .from("gallery")
      .delete()
      .eq("id", image.id);

    fetchImages();
  };

  return (
    <div className="container mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Gallery Management
      </h1>

      <div className="bg-white shadow rounded-xl p-6 mb-10">

        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        >
          <option>Events</option>
          <option>Sports</option>
          <option>Cultural Activities</option>
          <option>Annual Day</option>
          <option>Classroom Activities</option>
        </select>

        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] || null
            )
          }
        />

        <button
          onClick={uploadImage}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          {loading
            ? "Uploading..."
            : "Upload Image"}
        </button>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        {images.map((image) => (

          <div
            key={image.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >

            <img
              src={getImageUrl(
                image.storage_path
              )}
              alt={image.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">

              <h3 className="font-bold">
                {image.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {image.category}
              </p>

              <button
                onClick={() =>
                  deleteImage(image)
                }
                className="bg-red-600 text-white px-4 py-2 rounded mt-3"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}