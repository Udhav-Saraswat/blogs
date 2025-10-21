"use client";
import { useEffect, useRef } from "react";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width,
      alpha: Math.random(),
    }));

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);

    let angle = 0;

    function draw() {
      // ✅ Ensure ctx is not null here
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(255,255,255,0.8)";
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.z -= 1.5;
        if (s.z <= 0) s.z = width;

        const k = 128.0 / s.z;
        const px = s.x * k + width / 2;
        const py = s.y * k + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - s.z / width) * 2;
          ctx.globalAlpha = 0.5 + Math.abs(Math.sin(Date.now() * 0.002 + i)) * 0.5;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      if (bgRef.current) {
        angle += 0.000001;
        const baseScale = 1.5;
        const pulse = Math.sin(Date.now() * 0.0002) * 0.015;
        const scale = baseScale + pulse;
        bgRef.current.style.transform = `scale(${scale}) rotate(${angle}deg)`;
      }

      requestAnimationFrame(draw);
    }

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <div
        ref={bgRef}
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('images/galaxy-bg.png')",
          backgroundRepeat: "no-repeat",
          transformOrigin: "center center",
        }}
      />
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none"
      />
    </>
  );
}
