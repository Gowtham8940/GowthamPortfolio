import "lenis/dist/lenis.css";
import "./globals.css";
import { Geist, Noto_Sans_Tamil } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
  display: "swap",
});

const title = "Gowtham J — Full-stack & mobile engineer";
const description =
  "Gowtham J builds React Native apps, Next.js sites, mobile games and AI agents. 4+ years shipping government LMS apps used by 800K+ students in India and Ethiopia, and Aira, e-Khool's multi-agent course builder.";

export const metadata = {
  metadataBase: new URL("https://gowthamdev.vercel.app"),
  title,
  description,
  keywords: [
    "Gowtham J",
    "Full-stack developer",
    "React Native developer",
    "Next.js developer",
    "AI agents",
    "LangGraph",
    "MCP",
    "Mobile game developer",
    "e-Khool",
    "Tamil Nadu",
  ],
  authors: [{ name: "Gowtham J" }],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`font-sans ${geist.variable} ${tamil.variable}`}
    >
      <body className="antialiased min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider>
          <SmoothScroll>
            <LocaleProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </LocaleProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
