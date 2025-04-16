"use client";

import { useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { listings } from "@/data/listings";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ListingsPage() {
  const { searchQuery } = useSearch();
  const [sortOption, setSortOption] = useState("title");

  // Filter listings based on the search query
  const filteredListings = listings
    .filter(
      (listing) =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "location") {
        return a.location.localeCompare(b.location);
      }
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto p-10">
        <h1 className="text-4xl font-bold mb-6">Listings</h1>

        {/* Sort Dropdown */}
        <div className="mb-6 flex justify-end">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="title">Sort by Title</option>
            <option value="location">Sort by Location</option>
          </select>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="p-4 shadow-lg bg-gray-100 border border-gray-300 hover:shadow-2xl hover:scale-105 transition-transform duration-300 rounded-md"
            >
              <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  width={500}
                  height={192}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">{listing.title}</h4>
                <p className="text-gray-600 mb-2">{listing.location}</p>
                <p className="text-gray-500 text-sm mb-2">{listing.description}</p>
                <p className="text-lg font-semibold text-black mb-4">{listing.price}</p>
                <Link
                  href={`/property/${listing.id}`}
                  className="block mt-4 bg-black text-white hover:bg-gray-800 px-4 py-2 text-center rounded-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
