import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Pricing Page Template",
  description: "Free responsive pricing page / pricing table for Next.js + Tailwind CSS — monthly/yearly toggle, feature comparison, dark mode.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
