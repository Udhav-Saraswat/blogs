import os
from pathlib import Path
import subprocess
import textwrap

# === CONFIG ===
PROJECT_NAME = r"C:\Users\ASUS\Downloads\New folder (2)\geeky-chronicles-cosmic"
COMPONENTS = Path(PROJECT_NAME) / "components"
APP = Path(PROJECT_NAME) / "app"
PUBLIC = Path(PROJECT_NAME) / "public"

# === HELPERS ===
def run(cmd):
    print(f"⭐ Running: {cmd}")
    subprocess.run(cmd, shell=True, check=True)

def ensure_dir(path: Path):
    path.mkdir(parents=True, exist_ok=True)

# === MAIN SCRIPT ===
def main():
    print("🚀 Starting project setup...")

    ensure_dir(Path(PROJECT_NAME))
    os.chdir(PROJECT_NAME)

    # 1️⃣ Initialize Next.js app
    if not (Path(PROJECT_NAME) / "package.json").exists():
        print("⭐ Creating Next.js project...")
        run("npx create-next-app@14 geeky-chronicles-cosmic-temp --typescript --eslint --use-npm --no-tailwind --app")
        temp = Path(PROJECT_NAME) / "geeky-chronicles-cosmic-temp"
        for f in temp.iterdir():
            os.rename(f, Path(PROJECT_NAME) / f.name)
        os.rmdir(temp)

    # 2️⃣ Ensure basic folders
    print("⭐ Creating required folders...")
    ensure_dir(COMPONENTS)
    ensure_dir(APP)
    ensure_dir(PUBLIC)

    # 3️⃣ Install TailwindCSS + dependencies
    print("⭐ Installing TailwindCSS and Next-Themes...")
    run("npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss")
    run("npm install next-themes")

    # 4️⃣ Tailwind config
    print("⭐ Configuring TailwindCSS...")
    tailwind_config = textwrap.dedent("""
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      darkMode: "class",
      content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      theme: {
        extend: {
          backgroundImage: {
            'cosmic': "url('/cosmic-bg.jpg')",
          },
        },
      },
      plugins: [],
    }
    """)
    Path("tailwind.config.js").write_text(tailwind_config, encoding="utf-8")

    Path("postcss.config.js").write_text(textwrap.dedent("""
    module.exports = {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    }
    """), encoding="utf-8")

    # 5️⃣ globals.css
    print("⭐ Creating globals.css...")
    app_dir = APP
    ensure_dir(app_dir)
    css_dir = app_dir / "globals.css"
    css_dir.write_text(textwrap.dedent("""
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    body {
      @apply bg-black text-gray-200 transition-colors duration-300;
      background-image: url('/cosmic-bg.jpg');
      background-size: cover;
      background-attachment: fixed;
    }
    """), encoding="utf-8")

    # 6️⃣ Navbar component
    print("⭐ Creating Navbar with theme toggle...")
    (COMPONENTS / "Navbar.tsx").write_text(textwrap.dedent("""
    "use client";
    import { useTheme } from "next-themes";
    import { useEffect, useState } from "react";
    import Link from "next/link";

    export default function Navbar() {
      const { theme, setTheme } = useTheme();
      const [mounted, setMounted] = useState(false);
      useEffect(() => setMounted(true), []);
      if (!mounted) return null;

      return (
        <nav className="flex justify-between items-center p-4 bg-black/40 backdrop-blur-md fixed w-full z-50">
          <h1 className="text-cyan-400 text-2xl font-bold">Geeky Chronicles</h1>
          <div className="flex gap-4">
            {['Home', 'About', 'Philosophical Blogs', 'Scientific Blogs', "Shayari's"].map((page) => (
              <Link key={page} href={`/${page.toLowerCase().replace(/ /g, '-')}`}>
                <span className="hover:text-cyan-300">{page}</span>
              </Link>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-4 px-3 py-1 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </nav>
      );
    }
    """), encoding="utf-8")

    # 7️⃣ layout.tsx
    print("⭐ Creating layout.tsx...")
    layout_path = APP / "layout.tsx"
    layout_path.write_text(textwrap.dedent("""
    import "./globals.css";
    import { ThemeProvider } from "next-themes";
    import Navbar from "@/components/Navbar";

    export const metadata = {
      title: "Geeky Chronicles",
      description: "Exploring science, philosophy, and art of thought.",
    };

    export default function RootLayout({ children }) {
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
    """), encoding="utf-8")

    # 8️⃣ Create sample pages
    print("⭐ Creating sample pages...")
    pages = {
        "page.tsx": "Welcome to Geeky Chronicles — where science, philosophy, and poetry meet the cosmos.",
        "about/page.tsx": "This is the About page, a glimpse into the creator behind the chronicles.",
        "philosophical-blogs/page.tsx": "Philosophical musings and reflections on existence.",
        "scientific-blogs/page.tsx": "Scientific explorations of the universe and its mysteries.",
        "shayari's/page.tsx": "A poetic space for soul and expression."
    }

    for path, content in pages.items():
        full = APP / path
        ensure_dir(full.parent)
        full.write_text(f"<h1 className='text-3xl text-center mt-20'>{content}</h1>", encoding="utf-8")

    # 9️⃣ Add placeholder image
    print("⭐ Adding cosmic background image...")
    cosmic_img = PUBLIC / "cosmic-bg.jpg"
    cosmic_img.write_bytes(b"")  # You can replace this with a real image later

    print("\n✅ Project setup complete!")
    print("👉 Next steps:")
    print(f"   cd '{PROJECT_NAME}'")
    print("   npm run dev")

if __name__ == "__main__":
    main()
