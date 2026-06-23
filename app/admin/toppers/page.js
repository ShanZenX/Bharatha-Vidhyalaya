"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminToppersPage() {
const [loading, setLoading] =
useState(false);

const [toppers, setToppers] =
useState([]);

const [editingId, setEditingId] =
useState(null);

const [form, setForm] = useState({
student_name: "",
class_name: "",
rank: 1,
percentage: "",
academic_year: "",
});

const [photo, setPhoto] =
useState(null);

useEffect(() => {
fetchToppers();
}, []);

async function fetchToppers() {
const { data } = await supabase
.from("toppers")
.select("*")
.order("class_name")
.order("rank");


setToppers(data || []);


}

const getImageUrl = (path) => {
const { data } = supabase.storage
.from("toppers")
.getPublicUrl(path);


return data.publicUrl;


};

async function handleSubmit(e) {
e.preventDefault();


setLoading(true);

let photoPath = null;

if (photo) {
const fileExt = photo.name.split(".").pop();

const fileName =
  `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;
    
  const { error: uploadError } =
    await supabase.storage
      .from("toppers")
      .upload(fileName, photo);

  if (uploadError) {
    alert(uploadError.message);
    setLoading(false);
    return;
  }

  photoPath = fileName;
}

if (editingId) {
  const updateData = {
    ...form,
  };

  if (photoPath) {
    updateData.photo_path =
      photoPath;
  }

  const { error } = await supabase
    .from("toppers")
    .update(updateData)
    .eq("id", editingId);

  if (error) {
console.log(error);
alert(JSON.stringify(error));  }
} else {
  const { error } = await supabase
    .from("toppers")
    .insert([
      {
        ...form,
        photo_path: photoPath,
      },
    ]);

  if (error) {
    alert(error.message);
  }
}

setForm({
  student_name: "",
  class_name: "",
  rank: 1,
  percentage: "",
  academic_year: "",
});

setPhoto(null);
setEditingId(null);

fetchToppers();

setLoading(false);
```

}

async function deleteTopper(id) {
const confirmDelete =
window.confirm(
"Delete this topper?"
);

```
if (!confirmDelete) return;

await supabase
  .from("toppers")
  .delete()
  .eq("id", id);

fetchToppers();
```

}

function editTopper(topper) {
setEditingId(topper.id);

```
setForm({
  student_name:
    topper.student_name,
  class_name:
    topper.class_name,
  rank: topper.rank,
  percentage:
    topper.percentage,
  academic_year:
    topper.academic_year,
});

window.scrollTo({
  top: 0,
  behavior: "smooth",
});


}

return ( <div className="space-y-10">

  <div className="bg-white rounded-3xl p-8 shadow-lg">

    <h1 className="text-3xl font-bold mb-6">
      {editingId
        ? "Edit Topper"
        : "Add Topper"}
    </h1>

    <form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-2 gap-4"
    >
      <input
        type="text"
        placeholder="Student Name"
        value={form.student_name}
        onChange={(e) =>
          setForm({
            ...form,
            student_name:
              e.target.value,
          })
        }
        className="border p-3 rounded-xl"
        required
      />

      <select
        value={form.class_name}
        onChange={(e) =>
          setForm({
            ...form,
            class_name:
              e.target.value,
          })
        }
        className="border p-3 rounded-xl"
        required
      >
        <option value="">
          Select Class
        </option>

        {[...Array(10)].map(
          (_, i) => (
            <option
              key={i}
              value={`Class ${
                i + 1
              }`}
            >
              Class {i + 1}
            </option>
          )
        )}
      </select>

      <select
        value={form.rank}
        onChange={(e) =>
          setForm({
            ...form,
            rank:
              Number(
                e.target.value
              ),
          })
        }
        className="border p-3 rounded-xl"
      >
        <option value="1">
          🥇 Rank 1
        </option>

        <option value="2">
          🥈 Rank 2
        </option>

        <option value="3">
          🥉 Rank 3
        </option>
      </select>

      <input
        type="text"
        placeholder="Percentage"
        value={form.percentage}
        onChange={(e) =>
          setForm({
            ...form,
            percentage:
              e.target.value,
          })
        }
        className="border p-3 rounded-xl"
        required
      />

      <input
        type="text"
        placeholder="Academic Year"
        value={form.academic_year}
        onChange={(e) =>
          setForm({
            ...form,
            academic_year:
              e.target.value,
          })
        }
        className="border p-3 rounded-xl"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setPhoto(
            e.target.files[0]
          )
        }
        className="border p-3 rounded-xl"
      />

      <button
        type="submit"
        disabled={loading}
        className="
          md:col-span-2
          bg-yellow-500
          text-white
          py-3
          rounded-xl
          font-bold
        "
      >
        {loading
          ? "Saving..."
          : editingId
          ? "Update Topper"
          : "Add Topper"}
      </button>
    </form>
  </div>

  <div>

    <h2 className="text-2xl font-bold mb-6">
      Uploaded Toppers
    </h2>

    <div className="grid md:grid-cols-3 gap-6">

      {toppers.map((topper) => (
        <div
          key={topper.id}
          className="
            bg-white
            rounded-3xl
            overflow-hidden
            shadow-lg
          "
        >
          <img
            src={getImageUrl(
              topper.photo_path
            )}
            alt={
              topper.student_name
            }
            className="
              w-full
              h-72
              object-cover
            "
          />

          <div className="p-5">

            <h3 className="font-bold text-xl">
              {
                topper.student_name
              }
            </h3>

            <p>
              {
                topper.class_name
              }
            </p>

            <p>
              Rank #
              {topper.rank}
            </p>

            <p>
              {
                topper.percentage
              }
            </p>

            <p>
              {
                topper.academic_year
              }
            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  editTopper(
                    topper
                  )
                }
                className="
                  flex-1
                  bg-blue-600
                  text-white
                  py-2
                  rounded-lg
                "
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteTopper(
                    topper.id
                  )
                }
                className="
                  flex-1
                  bg-red-600
                  text-white
                  py-2
                  rounded-lg
                "
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
