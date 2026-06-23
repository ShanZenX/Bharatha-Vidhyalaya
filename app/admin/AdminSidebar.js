"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaImages,
  FaSignOutAlt,
  FaSchool,
  FaTrophy,
} from "react-icons/fa";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Admissions",
      href: "/admin/admissions",
      icon: <FaUserGraduate />,
    },
    {
      name: "Gallery",
      href: "/admin/gallery",
      icon: <FaImages />,
    },
    {
      name: "Toppers",
      href: "/admin/toppers",
      icon: <FaTrophy />,
    },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <aside
      className="
      w-72
      bg-slate-950
      text-white
      min-h-screen
      shadow-xl
      flex
      flex-col
      "
    >
      {/* School Header */}

      {/* Navigation */}

      <nav className="flex-1 p-4 flex flex-col justify-center">
        <p className="text-xs uppercase tracking-wider text-slate-500 mb-4 px-3">
          Main Menu
        </p>

        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              mb-2
              transition-all
              duration-200
              text-white
              text-decoration-none! no-underline!
              ${
                pathname === item.href
                  ? "bg-yellow-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }
            `}
          >
            <span className="text-lg">{item.icon}</span>

            <span className=" ">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          bg-red-600
          hover:bg-red-700
          py-3
          rounded-xl
          font-medium
          transition
          "
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}
