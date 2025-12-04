import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
}

interface AnimatedBackgroundProps {
  variant?: "particles" | "gradient" | "mesh" | "aurora";
  intensity?: "subtle" | "medium" | "vibrant";
  interactive?: boolean;
}

export function AnimatedBackground({
  variant = "aurora",
  intensity = "medium",
  interactive = true,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const intensityConfig = {
    subtle: { particleCount: 30, opacity: 0.3, speed: 0.3 },
    medium: { particleCount: 50, opacity: 0.5, speed: 0.5 },
    vibrant: { particleCount: 80, opacity: 0.7, speed: 0.8 },
  };

  const config = intensityConfig[intensity];

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (variant !== "particles" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    particlesRef.current = Array.from({ length: config.particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * config.speed,
      speedY: (Math.random() - 0.5) * config.speed,
      opacity: Math.random() * config.opacity,
      hue: 250 + Math.random() * 60,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (interactive) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const force = (150 - distance) / 150;
            particle.x -= dx * force * 0.02;
            particle.y -= dy * force * 0.02;
          }
        }

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 80%, 60%, ${particle.opacity})`;
        ctx.fill();
      });

      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(250, 70%, 60%, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [variant, dimensions, config, interactive]);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  if (variant === "particles") {
    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />
    );
  }

  if (variant === "aurora") {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
        
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full"
          style={{
            background: `radial-gradient(ellipse at center, hsla(250, 100%, 65%, ${config.opacity * 0.3}) 0%, transparent 60%)`,
          }}
          animate={{
            x: [0, 100, 50, 0],
            y: [0, 50, 100, 0],
            scale: [1, 1.2, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full"
          style={{
            background: `radial-gradient(ellipse at center, hsla(280, 100%, 60%, ${config.opacity * 0.25}) 0%, transparent 60%)`,
          }}
          animate={{
            x: [0, -80, -40, 0],
            y: [0, -60, -80, 0],
            scale: [1, 1.3, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-1/4 right-1/4 w-3/4 h-3/4"
          style={{
            background: `radial-gradient(ellipse at center, hsla(200, 100%, 60%, ${config.opacity * 0.2}) 0%, transparent 50%)`,
          }}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.15, 1.25, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, hsla(320, 80%, 50%, ${config.opacity * 0.1}) 0%, transparent 30%),
                             radial-gradient(circle at 80% 20%, hsla(180, 80%, 50%, ${config.opacity * 0.1}) 0%, transparent 30%)`,
          }}
        />
      </div>
    );
  }

  if (variant === "mesh") {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        
        <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10">
          <defs>
            <pattern id="mesh-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
        </svg>

        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              hsla(250, 100%, 60%, ${config.opacity * 0.15}) 0%, 
              transparent 50%, 
              hsla(280, 100%, 60%, ${config.opacity * 0.1}) 100%)`,
          }}
          animate={{
            opacity: [config.opacity * 0.5, config.opacity * 0.8, config.opacity * 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `linear-gradient(135deg, hsla(250, 80%, 60%, ${config.opacity * 0.2}) 0%, hsla(280, 80%, 60%, ${config.opacity * 0.15}) 50%, hsla(200, 80%, 60%, ${config.opacity * 0.1}) 100%)`,
              `linear-gradient(225deg, hsla(280, 80%, 60%, ${config.opacity * 0.2}) 0%, hsla(200, 80%, 60%, ${config.opacity * 0.15}) 50%, hsla(250, 80%, 60%, ${config.opacity * 0.1}) 100%)`,
              `linear-gradient(315deg, hsla(200, 80%, 60%, ${config.opacity * 0.2}) 0%, hsla(250, 80%, 60%, ${config.opacity * 0.15}) 50%, hsla(280, 80%, 60%, ${config.opacity * 0.1}) 100%)`,
              `linear-gradient(135deg, hsla(250, 80%, 60%, ${config.opacity * 0.2}) 0%, hsla(280, 80%, 60%, ${config.opacity * 0.15}) 50%, hsla(200, 80%, 60%, ${config.opacity * 0.1}) 100%)`,
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }

  return null;
}
