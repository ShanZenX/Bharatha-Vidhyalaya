"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import {
  FaUserGraduate,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data } = await supabase
      .from("admissions")
      .select("*");

    const total = data?.length || 0;

    const pending =
      data?.filter(
        (item) => item.status === "Pending"
      ).length || 0;

    const approved =
      data?.filter(
        (item) => item.status === "Approved"
      ).length || 0;

    setStats({
      total,
      pending,
      approved,
    });
  };

  return (
    <div className="p-4 md:p-8">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome to School Administration Panel
        </p>

      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <div
          className="
          bg-gradient-to-r
          from-blue-600
          to-blue-500
          text-white
          rounded-2xl
          p-6
          shadow-lg
          "
        >
          <div className="flex justify-between items-center">

            <div>
              <p className="text-blue-100">
                Total Admissions
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats.total}
              </h2>
            </div>

            <FaUserGraduate size={45} />

          </div>
        </div>

        <div
          className="
          bg-gradient-to-r
          from-amber-500
          to-orange-500
          text-white
          rounded-2xl
          p-6
          shadow-lg
          "
        >
          <div className="flex justify-between items-center">

            <div>
              <p className="text-orange-100">
                Pending Admissions
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats.pending}
              </h2>
            </div>

            <FaClock size={45} />

          </div>
        </div>

        <div
          className="
          bg-gradient-to-r
          from-green-600
          to-emerald-500
          text-white
          rounded-2xl
          p-6
          shadow-lg
          "
        >
          <div className="flex justify-between items-center">

            <div>
              <p className="text-green-100">
                Approved Admissions
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats.approved}
              </h2>
            </div>

            <FaCheckCircle size={45} />

          </div>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="mt-10 bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <a
            href="/admin/admissions"
            className="
            px-5 py-3
            bg-blue-600
            text-white
            rounded-xl
            hover:bg-blue-700
            transition
            text-decoration-none! no-underline!
            "
          >
            Manage Admissions
          </a>

          <a
            href="/admin/gallery"
            className="
            px-5 py-3
            bg-slate-800
            text-white
            rounded-xl
            hover:bg-slate-900
            transition
            text-decoration-none! no-underline!
            "
          >
            Manage Gallery
          </a>

        </div>

      </div>

      {/* Welcome Card */}

      <div className="mt-10 bg-white rounded-2xl shadow p-8">

        <h2 className="text-2xl font-bold text-slate-800">
          School Management System
        </h2>

        <p className="mt-3 text-slate-600 leading-relaxed">
          Use the sidebar to manage admissions,
          gallery images, and monitor school
          activities. This dashboard gives a
          quick overview of current admission
          statistics.
        </p>

      </div>

    </div>
  );
}