import AboutMain from "@/components/main/AboutMain";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "About Us",
    description: "Learn more about E-store, our mission, and our commitment to providing the best products and services to our customers.",
}
const AboutPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <AboutMain />
        </div>
    );
}

export default AboutPage;