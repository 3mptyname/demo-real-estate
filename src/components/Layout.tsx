"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <div className="transition-opacity duration-500 opacity-100">
        <NavBar />
        <main className="container mx-auto p-4">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
