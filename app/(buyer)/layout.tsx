import Navbar from "@/components/ui/Navbar";

export function BuyerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
    <Navbar /> 
    {children}</>;
}

export default BuyerLayout