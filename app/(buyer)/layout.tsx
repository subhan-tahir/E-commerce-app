import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export function BuyerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
    <Navbar /> 
    {children}
    <Footer />
    </>;
}

export default BuyerLayout