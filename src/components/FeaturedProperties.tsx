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
    <section className="p-10">
      <h3 className="text-2xl font-semibold mb-4">Featured Properties</h3>
      <div className="swiper-container bg-gray-50 p-6 rounded-lg shadow-md mb-8">
        <Swiper
          modules={[Navigation, Pagination]} // Pass modules to Swiper
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {propertiesToShow.map((property) => (
            <SwiperSlide key={property.id}>
              <div className="p-4 shadow-lg bg-gray-100 border border-gray-300 hover:shadow-2xl hover:scale-105 transition-transform duration-300 rounded-md">
                <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
                  <Image
                    src={property.image}
                    alt={property.title}
                    width={500}
                    height={192}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">{property.title}</h4>
                  <p className="text-gray-600 flex items-center mb-2">
                    <MapPin size={16} className="mr-2 text-gray-500" /> {property.location}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">{property.description}</p>
                  <p className="text-lg font-semibold">{property.price}</p>
                  <Link
                    href={`/property/${property.id}`}
                    className="block mt-4 bg-black text-white hover:bg-gray-800 px-4 py-2 text-center rounded-md"
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
