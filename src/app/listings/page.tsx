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

  // Filter and sort listings based on the search query and sort option
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
      } else if (sortOption === "price") {
        return parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
      }
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto p-4 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Listings</h1>

        {/* Sort Dropdown */}
        <div className="mb-8 flex justify-end">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-3 border border-gray-300 rounded-md w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="title">Sort by Title</option>
            <option value="location">Sort by Location</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="p-6 shadow-lg bg-white border border-gray-200 hover:shadow-2xl hover:scale-105 transition-transform duration-300 rounded-lg"
            >
              <div className="w-full h-48 md:h-56 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  width={500}
                  height={192}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col gap-2">
                {/* Make the title a clickable link */}
                <Link href={`/property/${listing.id}`}>
                  <h4 className="text-lg md:text-xl font-semibold text-black hover:text-gray-400 transition-colors duration-300">
                    {listing.title}
                  </h4>
                </Link>
                <p className="text-gray-600 text-sm md:text-base">{listing.location}</p>
                <p className="text-gray-500 text-sm md:text-base">{listing.description}</p>
                <p className="text-lg font-semibold text-black">{listing.price}</p>
                <Link
                  href={`/property/${listing.id}`}
                  className="mt-4 bg-black text-white hover:bg-gray-800 px-4 py-2 text-center rounded-md"
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
