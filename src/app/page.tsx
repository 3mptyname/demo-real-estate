import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import "leaflet/dist/leaflet.css";

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProperties />
    </Layout>
  );
}
