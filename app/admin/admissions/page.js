"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("admissions")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (!error) {
      setAdmissions(data || []);
    }

    setLoading(false);
  };

const updateStatus = async (id, status) => {
  console.log("Updating:", id, status);

  const { data, error } = await supabase
    .from("admissions")
    .update({ status })
    .eq("id", id)
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    alert(error.message);
    return;
  }

  fetchAdmissions();
};

  return (
    <div className="container-custom py-16">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Admissions Management
        </h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : admissions.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          No Admissions Found
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">

          <table className="w-full">

            <thead>
              <tr className="bg-slate-100">

                <th className="p-4 text-left">
                  Student
                </th>

                <th className="p-4 text-left">
                  Father
                </th>

                <th className="p-4 text-left">
                  Mobile
                </th>

                <th className="p-4 text-left">
                  Class
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {admissions.map((item) => (

                <tr
                  key={item.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {item.student_name}
                  </td>

                  <td className="p-4">
                    {item.father_name}
                  </td>

                  <td className="p-4">
                    {item.mobile}
                  </td>

                  <td className="p-4">
                    {item.class_applied}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        item.status === "Approved"
                          ? "bg-green-600"
                          : item.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          updateStatus(
                            item.id,
                            "Approved"
                          )
                        }
                        className="bg-green-600 text-white px-3 py-2 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            item.id,
                            "Rejected"
                          )
                        }
                        className="bg-red-600 text-white px-3 py-2 rounded"
                      >
                        Reject
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}