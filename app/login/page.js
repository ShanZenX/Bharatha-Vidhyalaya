"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

   const { error } =
  await supabase.auth.signInWithPassword({
    email,
    password,
  });

if (error) {
  alert(error.message);
  return;
}

router.push("/admin/dashboard");
  };

  return (
  <section
    className="
      min-h-screen
      flex
      items-center
      justify-center
      px-4
              bg-yellow-400/10

    "
  >
    <div
      className="
        w-full

        max-w-md
md:mt-20
        backdrop-blur-xl
        bg-transparent
        bg-blur-2xl

        border
        border-yellow-950!

        rounded-3xl

        shadow-2xl

        p-8
        md:p-10
      "
    >
      {/* Header */}

      <div className="text-center mb-8">

        <div
          className="
            w-20
            h-20
            mx-auto
            mb-5

            rounded-full

            bg-gradient-to-r
            from-yellow-400
            via-yellow-500
            to-yellow-400

            flex
            items-center
            justify-center

            text-3xl
          "
        >
          🎓
        </div>

        <h1
          className="
            font-heading
            text-4xl
            font-black

            bg-gradient-to-r
            from-yellow-300
            via-yellow-500
            to-yellow-300

            bg-clip-text
            text-transparent
          "
        >
          Admin Login
        </h1>

        <p className="text-gray-900 mt-2">
          Sign in to access the dashboard
        </p>

      </div>

      <form onSubmit={handleLogin}>

        {/* Email */}

        <div className="mb-4">

          <label className="text-black mb-2 block">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              px-4
              py-3

              rounded-xl

              bg-white/10
              border
              border-white/20

              text-black

              placeholder:text-gray-400

              focus:outline-none
              focus:border-yellow-400
              focus:ring-2
              focus:ring-yellow-400/30
            "
          />

        </div>

        {/* Password */}

        <div className="mb-6">

          <label className="text-black mb-2 block">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              px-4
              py-3

              rounded-xl

              bg-white/10
              border
              border-white/20

              text-black

              placeholder:text-gray-400

              focus:outline-none
              focus:border-yellow-400
              focus:ring-2
              focus:ring-yellow-400/30
            "
          />

        </div>

        {/* Button */}

        <button
          disabled={loading}
          className="
            w-full

            py-3

            rounded-xl

            bg-gradient-to-r
            from-yellow-400
            via-yellow-500
            to-yellow-400

            text-black
            font-bold

            shadow-lg

            hover:scale-[1.02]

            transition-all
            duration-300
          "
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </form>

    </div>
  </section>
);
}