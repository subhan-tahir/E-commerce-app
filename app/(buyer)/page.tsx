import { Button } from "@/components/ui/button";
import HomeMain from "@/components/main/HomeMain";

export const metadata = {
  title: "E-store",
  description: "Discover amazing products at unbeatable prices",
};
const HomePage = () => {
// add metadata for the home page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7837ff] to-[#6636c7] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to EStore
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover amazing products at unbeatable prices
          </p>
          <Button
            size="lg"
            className="bg-white text-[#7837ff] hover:bg-gray-100"
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <HomeMain />
    </div>
  );
};

export default HomePage; 