"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
