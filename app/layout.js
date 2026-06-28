import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gowtham | Senior React Native Developer & Mobile Architect",
  description: "Portfolio of Gowtham, a Senior React Native Developer with 3.6+ years of experience building high-performance, 60 FPS, offline-first mobile applications for iOS & Android, including enterprise and government LMS systems.",
  keywords: ["React Native", "Expo", "Swift", "Kotlin", "Mobile App Developer", "iOS Developer", "Android Developer", "Senior React Native Developer", "Resbee Info Tech"],
  authors: [{ name: "Gowtham" }],
  openGraph: {
    title: "Gowtham | Senior React Native Developer & Mobile Architect",
    description: "Expert in building high-performance, 60 FPS, offline-first React Native apps. Team Lead at Resbee Info Tech.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gowtham | Senior React Native Developer & Mobile Architect",
    description: "Expert in building high-performance, 60 FPS, offline-first React Native apps.",
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider>
          <SmoothScroll>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
