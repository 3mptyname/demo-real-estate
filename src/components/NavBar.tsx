"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearch } from "@/context/SearchContext";

interface NavBarProps {
  showSearch?: boolean; // Optional prop to control the search bar
}

export default function NavBar({ showSearch = true }: NavBarProps) {
  const pathname = usePathname();
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
          <div className="flex items-center justify-center flex-grow mx-4">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={handleSearch}
              className="p-2 rounded-md bg-white text-black w-64" // Adjusted width
            />
          </div>
        )}

        {/* Navigation Links */}
        <nav className="space-x-4">
          {pathname !== "/" && (
            <Link href="/" className="hover:underline">
              Home
            </Link>
          )}
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
