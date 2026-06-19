"use client";

import { usePathname } from "next/navigation";
import Footer from "./components/layout/Footer";
import CustomNavbar from "./components/layout/Navbar";



export default function LayoutWrapper({
  children,
}) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/admin") ||
    pathname === "/login";

  return (
    <>
      {!hideLayout && <CustomNavbar />}

      {children}

      {!hideLayout && <Footer />}
    </>
  );
}