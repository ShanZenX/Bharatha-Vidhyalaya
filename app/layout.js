import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LayoutWrapper from "./LayoutWrapper"

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "400",
    "500",
    "600",
    "700",
    "800",
  ],
  variable: "--font-poppins",
});

export const metadata = {
  title: {
    default:
      "Bharatha Vidhyalaya Matriculation School",
    template: "%s | Bharatha Vidhyalaya",
  },
  description:
    "Bharatha Vidhyalaya Matriculation Higher Secondary School",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} min-h-screen bg-slate-50`}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}