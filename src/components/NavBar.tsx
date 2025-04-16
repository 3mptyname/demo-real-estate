"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearch } from "@/context/SearchContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavBarProps {
  showSearch?: boolean; // Optional prop to control the search bar
}

export default function NavBar({ showSearch = true }: NavBarProps) {
  const pathname = usePathname();
  const { searchQuery, setSearchQuery } = useSearch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link href="/">Real Estate Company</Link>
        </h1>

        {/* Search Bar */}
        {showSearch && (
          <div className="hidden md:flex items-center justify-center flex-grow mx-4">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={handleSearch}
              className="p-2 rounded-md bg-white text-black w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        )}

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:underline hover:text-gray-300 transition-colors duration-300">
            Home
          </Link>
          <Link href="/about" className="hover:underline hover:text-gray-300 transition-colors duration-300">
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-gray-700 p-4 rounded-md">
          {showSearch && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={handleSearch}
                className="p-2 rounded-md bg-white text-black w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          )}
          <nav className="space-y-2">
            {pathname !== "/" && (
              <Link href="/" className="block hover:underline">
                Home
              </Link>
            )}
            <Link href="/about" className="block hover:underline">
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
