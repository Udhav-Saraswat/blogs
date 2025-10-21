
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Geeky Chronicles",
  description: "Exploring science, philosophy, and art of thought.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="pt-20 min-h-screen bg-gradient-to-br from-violet-900 via-indigo-900 to-black text-gray-200">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
