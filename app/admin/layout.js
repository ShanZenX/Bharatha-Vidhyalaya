"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import AdminSidebar from "./AdminSidebar";

import { HiMenu } from "react-icons/hi";

export default function AdminLayout({
  children,
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [userEmail, setUserEmail] =
    useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUserEmail(user.email);
    setLoading(false);
  };

  if (loading) {
    return (
      <div
        className="
          flex
          justify-center
          items-center
          min-h-screen
          text-xl
          font-semibold
        "
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-100">

      {/* Desktop Fixed Sidebar */}
      <div
        className="
          hidden
          md:block
          fixed
          left-0
          top-0
          h-screen
          w-72
          z-50
        "
      >
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/50
            md:hidden
          "
          onClick={() =>
            setSidebarOpen(false)
          }
        >
          <div
            className="
              w-72
              h-screen
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* Right Content Area */}
      <div
        className="
          md:ml-72
          h-screen
          overflow-y-auto
        "
      >

        {/* Header */}
        <header
          className="
            bg-white
            border-b
            shadow-sm
            px-4
            md:px-8
            py-4
            flex
            items-center
            justify-between
            sticky
            top-0
            z-40
          "
        >
          <div className="flex items-center gap-3">

            <button
              className="md:hidden"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <HiMenu size={28} />
            </button>

            <div>
              <h1 className="font-bold text-lg md:text-xl">
                School Management System
              </h1>

              <p className="text-sm text-slate-500">
                Admin Dashboard
              </p>
            </div>

          </div>

          <div
            className="
              hidden
              md:flex
              items-center
              gap-3
            "
          >
            <div
              className="
                h-10
                w-10
                rounded-full
                bg-yellow-400
                text-black
                flex
                items-center
                justify-center
                font-bold
              "
            >
              A
            </div>

            <div>
              <p className="font-medium">
                Administrator
              </p>

              <p className="text-sm text-slate-500">
                {userEmail}
              </p>
            </div>

          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}