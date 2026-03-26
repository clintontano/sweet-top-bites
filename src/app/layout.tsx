import type { Metadata } from "next";
import { Dela_Gothic_One, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const delaGothic = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dela-gothic",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sweet Top Bites — Bold Flavours. Every Bite.",
  description:
    "Order delicious fast food from Sweet Top Bites. Chicken burgers, shawarma, loaded fries and more from our branches in Legon, A&C Corner, and Adabraka.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${delaGothic.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#231200",
              border: "1px solid #FF6B00",
              color: "#FFF8F0",
            },
          }}
        />
      </body>
    </html>
  );
}
