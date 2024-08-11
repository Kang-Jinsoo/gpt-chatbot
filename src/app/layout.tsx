import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "gpt-Chatbot",
  description: "kangjinsoo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full">
      <body className="h-full bg-gray-950 text-white">{children}</body>
    </html>
  );
}
