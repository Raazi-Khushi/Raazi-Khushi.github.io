import type { Metadata } from "next";
import { Noto_Sans, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raazi Khushi — Aaj Raazi, Kal Khushi.",
  description:
    "Something's coming for parents tired of carrying the rishta hunt alone. No more biodata ke dher, broker ke chakkar, ya awkward phone calls — sirf verified families.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${notoSans.variable}`}>{children}</body>
    </html>
  );
}
