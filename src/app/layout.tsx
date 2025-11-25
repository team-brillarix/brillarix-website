import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brillarix: Powering Digital Innovation with Low-Code & Custom Solutions",
  description: "Brillarix transforms ideas into high-performance web applications. Specializing in low-code platforms like Bubble.io, we blend code and no-code to create scalable, secure, and efficient digital solutions. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
