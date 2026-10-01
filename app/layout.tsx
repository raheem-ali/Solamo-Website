import type { Metadata } from "next";
import { Albert_Sans, Josefin_Sans } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-albert-sans",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  title: "Solar Company in Karachi | Solamo Energy",
  description:
    "Trusted solar company in Karachi for home, commercial, industrial and agricultural solar systems, net metering, batteries and EV charging.",
  icons: {
    icon: "https://solamoenergy.com/wp-content/uploads/2026/05/cropped-For-light-mode-32x32.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-US"
      className={`${albertSans.variable} ${josefinSans.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
