import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import StarField from "@/components/StarField";

export const metadata = {
  title: "Udhav's Blog",
  description: "Exploring science, philosophy, and art of thought.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Essential for mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased relative overflow-x-hidden">
        {/* Theme provider */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Background starfield */}
          <StarField />

          {/* Navbar */}
          <Navbar />

          {/* Main content */}
          <main className="relative z-20 pt-20 min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-br from-violet-900 via-indigo-900 to-black text-gray-200">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
