import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/features/navigation/components/Navbar";
import ThemeProvider from "@/components/theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "QA Solucity | Where Quality Meets Innovation",
    template: "%s | QA Solucity",
  },
  description:
    "QA Solucity is a quality engineering and software testing company helping businesses build reliable, scalable, and high-performing digital products through manual testing, test automation, QA consulting, training, DevOps, and AI-powered automation solutions.",
  keywords: [
    "QA Solucity",
    "Software Testing",
    "Quality Assurance",
    "Test Automation",
    "QA Consulting",
    "Playwright",
    "Manual Testing",
    "DevOps",
    "AI Automation",
    "Software Quality",
    "Nigeria",
    "Lagos",
  ],
  applicationName: "QA Solucity",
  authors: [{ name: "QA Solucity" }],
  creator: "QA Solucity",
  publisher: "QA Solucity",
  metadataBase: new URL("https://qasolucity.com"), // Update if your production domain differs
  openGraph: {
    title: "QA Solucity | Where Quality Meets Innovation",
    description:
      "Helping businesses deliver reliable software through quality engineering, software testing, automation, DevOps, and AI-powered QA solutions.",
    url: "https://qasolucity.com",
    siteName: "QA Solucity",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QA Solucity | Where Quality Meets Innovation",
    description:
      "Helping businesses deliver reliable software through quality engineering, software testing, automation, DevOps, and AI-powered QA solutions.",
  },
  // No manual `icons` entry: app/icon.png, app/apple-icon.png, and
  // app/favicon.ico (Next's file-convention icons) are picked up and
  // linked automatically. Explicitly setting `icons` here would override
  // that and silently disable them.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          {/* <CustomCursor /> */}
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}