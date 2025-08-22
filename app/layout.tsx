import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import  AuthProvider  from "@/components/providers/AuthProvider";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { Bounce, ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.tsx

export const metadata: Metadata = {
  title: {
    default: "E-store",
    template: "%s - E-store", // 👈 template for all child pages
  },
  description:
    "Shop electronics, fashion, and lifestyle products at E-store. Free shipping, easy returns, and exclusive deals every day!",
  keywords: [
    "E-store",
    "ecommerce",
    "buy",
    "sell",
    "online shopping",
    "ecommerce app",
    "ecommerce website",
    "ecommerce platform",
    "online store",
    "buy online",
    "sell online",
  ],
  authors: [{ name: "Subhan Tahir", url: "https://e-commerce-app-blue-two.vercel.app/" }],
  creator: "Subhan Tahir",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextTopLoader
          color="linear-gradient(to right, #7837ff, #6636c7)"
          height={3}
          showSpinner={false}
        />
        <ReduxProvider>
          <AuthProvider>
           
            <ToastContainer 
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              transition={Bounce}
              toastClassName="custom-toast"
              theme="colored"
              progressClassName={"#6636c7"}
            />
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}