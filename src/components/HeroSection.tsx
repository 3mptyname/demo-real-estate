import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="p-10 text-center">
      <h2 className="text-4xl font-semibold mb-4">Find Your Dream Home</h2>
      <p className="text-gray-600 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Button className="bg-black text-white hover:bg-gray-800">
        <Link href="/listings">View Listings</Link> {/* Corrected link */}
      </Button>
    </section>
  );
}
