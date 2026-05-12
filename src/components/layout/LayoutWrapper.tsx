"use client";

import { usePathname } from "next/navigation";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <main className={!isAdminRoute ? "pt-16 flex-1" : "flex-1"}>
        {children}
      </main>

      {!isAdminRoute && <Footer />}
    </>
  );
}