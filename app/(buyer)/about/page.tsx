"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/container";
const sections = [
    {
        title: "Our Mission",
        text: "We strive to deliver the best e-commerce experience, connecting buyers and sellers with ease and trust.",
        image: "/about/about-us.jpg",
        reverse: false,
    },
    {
        title: "Our Team",
        text: "Our diverse team is passionate about innovation, customer service, and building a vibrant online marketplace.",
        image: "/about/about-us-2.jpg",
        reverse: true,
    },
    {
        title: "Our Values",
        text: "Integrity, transparency, and customer satisfaction are at the core of everything we do.",
        image: "/about/about-us-3.jpg",
        reverse: false,
    },
];

const AboutPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden mb-12">
                <Image
                    src="/about/about-us1.jpg"
                    alt="About Us Hero"
                    fill
                    className="object-cover object-center brightness-75"
                    priority
                />
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">About Us</h1>
                    <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow">Learn more about our mission, team, and values.</p>
                </div>
            </section>

            {/* Animated Sections */}
            <Container className="space-y-16 pb-16">
                {sections.map((section, idx) => (
                    <section
                    key={idx}
                    className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${section.reverse ? "md:flex-row-reverse" : ""}`}
                    >
                        <motion.div className="flex-1"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: idx * 0.2, ease: "easeInOut", type: "spring", stiffness: 100 }}
                            viewport={{ once: true, amount: 0.8 }}

                        >
                            <Image
                                src={section.image}
                                alt={section.title}
                                width={500}
                                height={350}
                                className="rounded-xl shadow-lg object-cover w-full h-[250px] md:h-[350px]"
                            />
                        </motion.div>
                        <motion.div className="flex-1 text-center md:text-left"
                          
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: idx * 0.2, ease: "easeInOut", type: "spring", stiffness: 100 }}
                            viewport={{ once: true, amount: 0.8 }}
                        >
                            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900">{section.title}</h2>
                            <p className="text-lg md:text-xl text-gray-700 max-w-xl mx-auto md:mx-0">{section.text}</p>
                        </motion.div>
                    </section>
                ))}
            </Container>
        </div>
    );
}

export default AboutPage;