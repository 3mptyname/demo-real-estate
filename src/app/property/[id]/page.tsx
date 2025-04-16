"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { listings } from "@/data/listings";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

interface Property {
  id: number;
  title: string;
  location: string;
  description: string;
  image: string;
  price: string; // Added price property
  coordinates: [number, number];
}

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [iconReady, setIconReady] = useState(false);
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true); // Show confirmation card
  };

  useEffect(() => {
    params.then((resolvedParams) => {
      const foundProperty = listings.find((p) => p.id === Number(resolvedParams.id));
      if (!foundProperty) {
        notFound();
      }
      setProperty({
        ...foundProperty,
        coordinates: getCoordinates(foundProperty.location), // Add coordinates based on location
      });
    });

    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => {
        const icon = leaflet.icon({
          iconUrl: "/images/location-dot-solid.svg",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });
        setCustomIcon(icon);
        setIconReady(true);
      });
    }
  }, [params]);

  const getCoordinates = (location: string): [number, number] => {
    const coordinatesMap: { [key: string]: [number, number] } = {
      "New York, USA": [40.7128, -74.0060],
      "Malibu, USA": [34.0259, -118.7798],
      "Toronto, Canada": [43.65107, -79.347015],
      "London, UK": [51.5074, -0.1278],
      "Tuscany, Italy": [43.7711, 11.2486],
      "Tokyo, Japan": [35.6895, 139.6917],
      "Aspen, USA": [39.1911, -106.8175],
      "Sydney, Australia": [-33.8688, 151.2093],
      "Paris, France": [48.8566, 2.3522],
      "Cape Town, South Africa": [-33.9249, 18.4241],
      "Dubai, UAE": [25.276987, 55.296249],
      "Lake Tahoe, USA": [39.0968, -120.0324],
      "Berlin, Germany": [52.5200, 13.4050],
      "Bali, Indonesia": [-8.3405, 115.0920],
      "Zermatt, Switzerland": [46.0207, 7.7491],
    };

    return coordinatesMap[location] || [0, 0]; // Default to [0, 0] if location is not found
  };

  if (!property || !iconReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar showSearch={false} />
      <main className="flex-grow container mx-auto p-10">
        <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
        <p className="text-lg font-semibold text-black mb-2">Price: {property.price}</p>
        <p className="text-gray-700 mb-2">{property.description}</p>
        <p className="text-gray-600 mb-6">Location: {property.location}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full h-64">
            <Image
              src={property.image}
              alt={property.title}
              width={400}
              height={256}
              className="w-full h-full object-cover rounded-md mb-6"
              priority
            />
          </div>
          <div className="w-full h-96 rounded-md overflow-hidden">
            {iconReady && customIcon && (
              <MapContainer
                center={property.coordinates as [number, number]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={property.coordinates} icon={customIcon}>
                  <Popup>
                    <strong>{property.title}</strong> <br />
                    {property.location} <br />
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Contact Us About This Property</h2>
          {formSubmitted ? (
            // Confirmation Card
            <div className="p-6 bg-green-100 border border-green-300 rounded-md text-center">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Thank you!</h3>
              <p className="text-green-700">Your message has been sent successfully. We will get back to you shortly.</p>
            </div>
          ) : (
            // Contact Form
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleFormSubmit}
            >
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
