import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="p-6 bg-white shadow-md flex justify-between items-center border-b border-gray-300">
        <h1 className="text-2xl font-bold">FindYourHome</h1>
        <nav>
          <Link href="/properties" className="text-black hover:underline mr-4">Browse Properties</Link>
          <Link href="/about" className="text-black hover:underline mr-4">About Us</Link>
          <Link href="/properties" className="text-black hover:underline mr-4">Browse Properties</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="p-10 text-center">
        <h2 className="text-4xl font-semibold mb-4">Find Your Dream Home</h2>
        <p className="text-gray-600 mb-6">Explore a wide range of properties that match your needs.</p>
        <Button className="bg-black text-white hover:bg-gray-800">
          <Link href="/properties">View Listings</Link>
        </Button>
      </main>

      {/* Featured Properties */}
      <section className="p-10">
        <h3 className="text-2xl font-semibold mb-4">Featured Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <Card
              key={id}
              className="p-4 shadow-lg bg-gray-100 border border-gray-300 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <img
                src={`/images/property-${id}.jpg`}
                alt={`Property ${id}`}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <CardContent>
                <h4 className="text-xl font-semibold">Apartment</h4>
                <p className="text-gray-600 flex items-center">
                  <MapPin size={16} className="mr-2 text-gray-500" /> Cape Town, Western Cape
                </p>
                <Button className="mt-4 bg-black text-white hover:bg-gray-800">
                  <Link href={`/property/${id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 bg-white text-center mt-10 border-t border-gray-300">
        <p className="text-gray-600">Designed by Monté</p>
      </footer>
    </div>
  );
}
