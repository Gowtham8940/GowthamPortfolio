"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

export function Particles({
  className = "",
  quantity = 80,
  staticity = 50,
  ease = 50,
  refresh = false
}) {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const { theme } = useTheme();
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  useEffect(() => {
    if (canvasRef.current) {
      initCanvas();
    }
    window.addEventListener("resize", initCanvas);
    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, [theme]);

  useEffect(() => {
    onMouseMove();
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = (e) => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect();
      mouse.current.x = (e ? e.clientX : 0) - rect.left;
      mouse.current.y = (e ? e.clientY : 0) - rect.top;
    }
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current) {
      particles.current = [];
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      const context = canvasRef.current.getContext("2d");
      context.scale(dpr, dpr);
      
      // Generate particles
      for (let i = 0; i < quantity; i++) {
        particles.current.push(generateParticle());
      }
    }
  };

  const generateParticle = () => {
    const x = Math.random() * canvasSize.current.w;
    const y = Math.random() * canvasSize.current.h;
    const translateX = 0;
    const translateY = 0;
    const size = Math.random() * 2 + 0.5;
    const alpha = 0;
    const targetAlpha = Math.random() * 0.6 + 0.1;
    const dx = (Math.random() - 0.5) * 0.15;
    const dy = (Math.random() - 0.5) * 0.15;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism
    };
  };

  const drawParticles = () => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    const render = () => {
      context.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
      
      const particleColor = theme === "light" ? "0, 0, 0" : "255, 255, 255";

      particles.current.forEach((p, idx) => {
        // Move towards mouse or drift
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Attraction force
        if (distance < 120) {
          const forceX = (dx / distance) * p.magnetism * 0.05;
          const forceY = (dy / distance) * p.magnetism * 0.05;
          p.translateX += (forceX - p.translateX) / ease;
          p.translateY += (forceY - p.translateY) / ease;
        } else {
          p.translateX += (0 - p.translateX) / ease;
          p.translateY += (0 - p.translateY) / ease;
        }

        p.x += p.dx + p.translateX;
        p.y += p.dy + p.translateY;

        // Boundary collision
        if (p.x < 0 || p.x > canvasSize.current.w) p.dx = -p.dx;
        if (p.y < 0 || p.y > canvasSize.current.h) p.dy = -p.dy;

        // Fade in
        if (p.alpha < p.targetAlpha) {
          p.alpha += 0.01;
        }

        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        context.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
        context.fill();
      });

      requestAnimationFrame(render);
    };

    render();
  };

  return (
    <div
      ref={canvasContainerRef}
      className={`absolute inset-0 -z-10 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
export default Particles;
