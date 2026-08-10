"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminToppersPage() {
  const [loading, setLoading] = useState(false);
  const [toppers, setToppers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    student_name: "",
    class_name: "",
    rank: 1,
    percentage: "",
    academic_year: "",
  });

  const [photo, setPhoto] = useState(null);

  // Classes
  const classes = [
    "LKG",
    "UKG",
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
    "Class 11",
    "Class 12",
  ];

  // Fetch toppers
  useEffect(() => {
    fetchToppers();
  }, []);

  async function fetchToppers() {
    const { data, error } = await supabase
      .from("toppers")
      .select("*")
      .order("class_name")
      .order("rank");

    if (error) {
      console.error("Error fetching toppers:", error);
      return;
    }

    setToppers(data || []);
  }

  // Get image URL
  const getImageUrl = (path) => {
    if (!path) {
      return "/default-student.jpg";
    }

    const { data } = supabase.storage
      .from("toppers")
      .getPublicUrl(path);

    return data.publicUrl;
  };

  // Handle form input
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Submit form
  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    let photoPath = null;

    // Upload photo
    if (photo) {
      const fileExt = photo.name.split(".").pop();

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("toppers")
        .upload(fileName, photo);

      if (uploadError) {
        console.error(uploadError);
        alert(uploadError.message);
        setLoading(false);
        return;
      }

      photoPath = fileName;
    }

    // UPDATE
    if (editingId) {
      const updateData = {
        student_name: form.student_name,
        class_name: form.class_name,
        rank: Number(form.rank),
        percentage: form.percentage,
        academic_year: form.academic_year,
      };

      // Only update photo if a new photo is selected
      if (photoPath) {
        updateData.photo_path = photoPath;
      }

      const { error } = await supabase
        .from("toppers")
        .update(updateData)
        .eq("id", editingId);

      if (error) {
        console.error(error);
        alert(error.message);
        setLoading(false);
        return;
      }

      alert("Topper updated successfully!");
    }

    // INSERT
    else {
      const { error } = await supabase
        .from("toppers")
        .insert([
          {
            student_name: form.student_name,
            class_name: form.class_name,
            rank: Number(form.rank),
            percentage: form.percentage,
            academic_year: form.academic_year,
            photo_path: photoPath,
          },
        ]);

      if (error) {
        console.error(error);
        alert(error.message);
        setLoading(false);
        return;
      }

      alert("Topper added successfully!");
    }

    // Reset form
    setForm({
      student_name: "",
      class_name: "",
      rank: 1,
      percentage: "",
      academic_year: "",
    });

    setPhoto(null);
    setEditingId(null);

    // Reset file input
    const fileInput = document.getElementById("topper-photo");

    if (fileInput) {
      fileInput.value = "";
    }

    await fetchToppers();

    setLoading(false);
  }

  // Delete topper
  async function deleteTopper(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this topper?"
    );

    if (!confirmDelete) {
      return;
    }

    const { error } = await supabase
      .from("toppers")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Topper deleted successfully!");

    fetchToppers();
  }

  // Edit topper
  function editTopper(topper) {
    setEditingId(topper.id);

    setForm({
      student_name: topper.student_name || "",
      class_name: topper.class_name || "",
      rank: topper.rank || 1,
      percentage: topper.percentage || "",
      academic_year: topper.academic_year || "",
    });

    setPhoto(null);

    const fileInput = document.getElementById("topper-photo");

    if (fileInput) {
      fileInput.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Cancel edit
  function cancelEdit() {
    setEditingId(null);

    setForm({
      student_name: "",
      class_name: "",
      rank: 1,
      percentage: "",
      academic_year: "",
    });

    setPhoto(null);

    const fileInput = document.getElementById("topper-photo");

    if (fileInput) {
      fileInput.value = "";
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* Header */}
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold mb-3">
            Academic Excellence
          </span>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900">
            {editingId ? "Edit Topper" : "Add Topper"}
          </h1>

          <p className="text-gray-500 mt-2">
            Manage school toppers and their academic achievements.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg p-5 md:p-8 mb-12">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-5"
          >

            {/* Student Name */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Student Name
              </label>

              <input
                type="text"
                name="student_name"
                placeholder="Enter student name"
                value={form.student_name}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                required
              />
            </div>

            {/* Class */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Class
              </label>

              <select
                name="class_name"
                value={form.class_name}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                required
              >
                <option value="">
                  Select Class
                </option>

                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Rank */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Rank
              </label>

              <select
                name="rank"
                value={form.rank}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
              >
                <option value={1}>
                  🥇 Rank 1
                </option>

                <option value={2}>
                  🥈 Rank 2
                </option>

                <option value={3}>
                  🥉 Rank 3
                </option>
              </select>
            </div>

            {/* Percentage */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Percentage
              </label>

              <input
                type="text"
                name="percentage"
                placeholder="Example: 98.5%"
                value={form.percentage}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                required
              />
            </div>

            {/* Academic Year */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Academic Year
              </label>

              <input
                type="text"
                name="academic_year"
                placeholder="Example: 2025-2026"
                value={form.academic_year}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                required
              />
            </div>

            {/* Photo */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Student Photo
              </label>

              <input
                id="topper-photo"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPhoto(e.target.files?.[0] || null)
                }
                className="w-full border border-gray-200 p-3 rounded-xl bg-white"
              />

              {editingId && (
                <p className="text-xs text-gray-500 mt-2">
                  Leave empty to keep the existing photo.
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex flex-col md:flex-row gap-3 mt-2">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-bold transition disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Topper"
                  : "Add Topper"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="md:w-40 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </div>

        {/* Uploaded Toppers */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">
            Uploaded Toppers
          </h2>

          <p className="text-gray-500 mt-1">
            {toppers.length} topper
            {toppers.length !== 1 ? "s" : ""} uploaded
          </p>
        </div>

        {/* Empty State */}
        {toppers.length === 0 && (
          <div className="bg-white rounded-3xl shadow p-10 text-center">
            <div className="text-5xl mb-4">
              🏆
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              No toppers yet
            </h3>

            <p className="text-gray-500 mt-2">
              Add your first topper using the form above.
            </p>
          </div>
        )}

        {/* Toppers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {toppers.map((topper) => (
            <div
              key={topper.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >

              {/* Image */}
              <div className="relative">

                <img
                  src={getImageUrl(topper.photo_path)}
                  alt={topper.student_name}
                  className="w-full h-64 object-cover"
                />

                {/* Rank */}
                <div className="absolute top-3 right-3 bg-yellow-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow">
                  Rank #{topper.rank}
                </div>

              </div>

              {/* Content */}
              <div className="p-5">

                <div className="flex items-center justify-between mb-3">

                  <h3 className="font-bold text-xl text-gray-900">
                    {topper.student_name}
                  </h3>

                  <span className="text-2xl">
                    {topper.rank === 1
                      ? "🥇"
                      : topper.rank === 2
                      ? "🥈"
                      : "🥉"}
                  </span>

                </div>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Class
                    </span>

                    <span className="font-semibold text-gray-800">
                      {topper.class_name}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Rank
                    </span>

                    <span className="font-semibold text-gray-800">
                      #{topper.rank}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Percentage
                    </span>

                    <span className="font-semibold text-yellow-700">
                      {topper.percentage}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Academic Year
                    </span>

                    <span className="font-semibold text-gray-800">
                      {topper.academic_year}
                    </span>
                  </div>

                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-5">

                  <button
                    type="button"
                    onClick={() => editTopper(topper)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold transition"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteTopper(topper.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-semibold transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}