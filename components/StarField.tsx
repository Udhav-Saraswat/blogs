"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  trailLen: number;
  alpha: number;
  ttl: number;
  age: number;
}

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

    const starColors = [
      "#ffffff",
      "#cffafe",
      "#e0f2fe",
      "#f0f9ff",
      "#a5f3fc",
      "#bfdbfe",
    ];

    const stars: Star[] = Array.from({ length: 300 }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    const shootingStars: ShootingStar[] = [];

    function spawnShootingStar() {
      if (shootingStars.length >= 2) return;
      const angle = (10 + Math.random() * 20) * (Math.PI / 180);
      const speed = 8 + Math.random() * 7;
      shootingStars.push({
        x: Math.random() * width * 0.7,
        y: Math.random() * height * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        trailLen: 100 + Math.random() * 120,
        alpha: 1,
        ttl: 55 + Math.floor(Math.random() * 35),
        age: 0,
      });
    }

    const shootInterval = setInterval(
      spawnShootingStar,
      2800 + Math.random() * 3500
    );

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    let bgAngle = 0;
    let rafId: number;

    function draw() {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, width, height);

      // Depth-field stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.z -= 1.1;
        if (s.z <= 0) s.z = width;

        const k = 128 / s.z;
        const px = s.x * k + width / 2;
        const py = s.y * k + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - s.z / width) * 2.8;
          const pulse = 0.45 + Math.abs(Math.sin(Date.now() * 0.0014 + i * 0.7)) * 0.55;
          ctx.globalAlpha = pulse;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.3, size), 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      // Shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.age++;
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.alpha = Math.max(0, 1 - ss.age / ss.ttl);

        const tailX = ss.x - ss.vx * (ss.trailLen / Math.hypot(ss.vx, ss.vy));
        const tailY = ss.y - ss.vy * (ss.trailLen / Math.hypot(ss.vx, ss.vy));

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, "rgba(165,243,252,0)");
        grad.addColorStop(0.6, `rgba(165,243,252,${ss.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(255,255,255,${ss.alpha})`);

        ctx.globalAlpha = ss.alpha;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        // Tip glow dot
        ctx.globalAlpha = ss.alpha * 0.9;
        ctx.fillStyle = "#e0f9ff";
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.5, 0, 2 * Math.PI);
        ctx.fill();

        if (ss.age >= ss.ttl) shootingStars.splice(i, 1);
      }

      ctx.globalAlpha = 1;

      // Slowly rotate the galaxy background
      if (bgRef.current) {
        bgAngle += 0.000007;
        const pulse = Math.sin(Date.now() * 0.00014) * 0.012;
        bgRef.current.style.transform = `scale(${1.5 + pulse}) rotate(${bgAngle}deg)`;
      }

      rafId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(shootInterval);
      cancelAnimationFrame(rafId);
    };
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
          willChange: "transform",
        }}
      />
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
