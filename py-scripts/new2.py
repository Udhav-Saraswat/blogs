import os
from pathlib import Path

# ====== CONFIG ======
PROJECT = Path("C:/Users/ASUS/Downloads/New folder (2)/geeky-chronicles-cosmic")
APP = PROJECT / "app"
COMPONENTS = PROJECT / "components"

# ====== STARFIELD COMPONENT ======
STARFIELD_CODE = """\
"use client";
import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * w,
    }));

    const animate = () => {
      if (!ctx) return;
      ctx.fillStyle = "rgb(5, 5, 20)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "white";
      stars.forEach((star) => {
        star.z -= 2;
        if (star.z <= 0) star.z = w;
        const sx = (star.x - w / 2) * (w / star.z) + w / 2;
        const sy = (star.y - h / 2) * (w / star.z) + h / 2;
        const r = w / star.z;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
  );
}
"""

# ====== PAGE TEMPLATE ======
PAGE_TEMPLATE = """\
export default function {name}Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-10">
      <h1 className="text-4xl text-cyan-400 mb-4">{title}</h1>
      <p className="text-lg text-gray-300 max-w-2xl">
        This section is under construction. Stay tuned for cosmic content!
      </p>
    </main>
  );
}
"""

# ====== LAYOUT FIX ======
LAYOUT_CODE = """\
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";

export const metadata = {
  title: "Geeky Chronicles",
  description: "Exploring science, philosophy, and poetry across the cosmos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Starfield />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
"""

# ====== MAIN LOGIC ======
def main():
    print("🚀 Updating Geeky Chronicles Project...")

    COMPONENTS.mkdir(exist_ok=True)
    (COMPONENTS / "Starfield.tsx").write_text(STARFIELD_CODE, encoding="utf-8")
    print("✅ Starfield background added!")

    for folder, title in [
        ("about", "About Geeky Chronicles"),
        ("philosophical", "Philosophical Blogs"),
        ("scientific", "Scientific Blogs"),
        ("shayari", "Shayari's and Poetry"),
    ]:
        dir_path = APP / folder
        dir_path.mkdir(parents=True, exist_ok=True)
        file_path = dir_path / "page.tsx"
        file_path.write_text(PAGE_TEMPLATE.format(name=folder.capitalize(), title=title), encoding="utf-8")
        print(f"✅ {folder.capitalize()} page created")

    layout_path = APP / "layout.tsx"
    layout_path.write_text(LAYOUT_CODE, encoding="utf-8")
    print("✅ Layout updated successfully")

    print("\n🎉 All done! Now run:")
    print("   cd geeky-chronicles-cosmic")
    print("   npm run dev")


if __name__ == "__main__":
    main()
