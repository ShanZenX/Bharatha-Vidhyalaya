"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContentPage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase
      .from("content")
      .select("*");

    setContent(data || []);
  };

  const updateContent = async (id, title, text) => {
    setLoading(true);

    const { error } = await supabase
      .from("content")
      .update({
        title,
        content: text,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      alert("Updated Successfully");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Content Management
      </h1>

      {content.map((item) => (
        <ContentCard
          key={item.id}
          item={item}
          onSave={updateContent}
          loading={loading}
        />
      ))}
    </div>
  );
}

function ContentCard({
  item,
  onSave,
  loading,
}) {
  const [title, setTitle] =
    useState(item.title);

  const [text, setText] =
    useState(item.content);

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">

      <p className="font-bold mb-2">
        {item.section_name}
      </p>

      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full border p-3 rounded mb-3"
      />

      <textarea
        rows={6}
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        className="w-full border p-3 rounded mb-3"
      />

      <button
        onClick={() =>
          onSave(item.id, title, text)
        }
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading
          ? "Saving..."
          : "Save Changes"}
      </button>

    </div>
  );
}