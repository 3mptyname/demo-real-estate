"use client";

import { useSearch } from "@/context/SearchContext";
import { listings } from "@/data/listings";
import { MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Correct import for Swiper 11.2.6
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FeaturedProperties() {
  const { searchQuery } = useSearch();

  // Filter properties based on the search query
  const filteredProperties = listings.filter(
    (property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Limit to 9 properties
  const propertiesToShow = filteredProperties.slice(0, 9);

  return (
    <section className="p-6 md:p-12">
      <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Properties</h3>
      <div className="swiper-container bg-gray-50 p-6 md:p-8 rounded-lg shadow-lg">
        <Swiper
          modules={[Navigation, Pagination]} // Pass modules to Swiper
          pagination={{ clickable: true }}
          spaceBetween={24} // Increased spacing between slides
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1, navigation: false }, // Disable navigation for smartphones
            768: { slidesPerView: 2, navigation: true }, // Enable navigation for tablets
            1024: { slidesPerView: 3, navigation: true }, // Enable navigation for desktops
          }}
        >
          {propertiesToShow.map((property) => (
            <SwiperSlide key={property.id}>
              <div className="p-6 shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 rounded-lg">
                <div className="w-full h-48 md:h-56 mb-4 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col gap-2">
                  {/* Make the title a clickable link */}
                  <Link href={`/property/${property.id}`}>
                    <h4 className="text-lg md:text-xl font-semibold text-black hover:text-gray-600 transition-colors duration-300">
                      {property.title}
                    </h4>
                  </Link>
                  <p className="text-gray-600 flex items-center text-sm md:text-base">
                    <MapPin size={16} className="mr-2 text-gray-500" /> {property.location}
                  </p>
                  <p className="text-gray-500 text-sm md:text-base">{property.description}</p>
                  <p className="text-lg font-semibold text-black mt-2">{property.price}</p>
                  <Link
                    href={`/property/${property.id}`}
                    className="mt-4 bg-black text-white hover:bg-gray-800 px-4 py-2 text-center rounded-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
