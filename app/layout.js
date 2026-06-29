import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata = {
  title: "Gowtham | React Native Developer & Mobile Architect",
  description: "Portfolio of Gowtham, a React Native Developer with 3.7+ years of experience building high-performance, 60 FPS, offline-first mobile applications for iOS & Android, including enterprise and government LMS systems.",
  keywords: ["React Native", "Expo", "Swift", "Kotlin", "Mobile App Developer", "iOS Developer", "Android Developer", "React Native Developer", "Resbee Info Tech"],
  authors: [{ name: "Gowtham" }],
  openGraph: {
    title: "Gowtham | React Native Developer & Mobile Architect",
    description: "Expert in building high-performance, 60 FPS, offline-first React Native apps. Team Lead at Resbee Info Tech.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gowtham | React Native Developer & Mobile Architect",
    description: "Expert in building high-performance, 60 FPS, offline-first React Native apps.",
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="font-sans"
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
