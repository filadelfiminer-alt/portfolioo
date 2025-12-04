import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-fuchsia-500/20 to-purple-600/30 dark:from-violet-900/50 dark:via-fuchsia-800/30 dark:to-purple-900/50" />
      
      {/* Animated mesh gradient */}
      <div className="mesh-bg" />
      
      {/* Large floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      <div className="orb orb-5" />
      
      {/* Glowing lines */}
      <div className="glow-line glow-line-1" />
      <div className="glow-line glow-line-2" />
      <div className="glow-line glow-line-3" />
      
      {/* Floating particles */}
      <div className="particles-container">
        {[...Array(30)].map((_, i) => (
          <div key={i} className={`particle particle-${(i % 10) + 1}`} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 20}s`
          }} />
        ))}
      </div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-noise" />
      
      <style>{`
        .mesh-bg {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(139, 92, 246, 0.4), transparent 50%),
            radial-gradient(ellipse 60% 60% at 80% 20%, rgba(217, 70, 239, 0.35), transparent 50%),
            radial-gradient(ellipse 70% 70% at 50% 80%, rgba(168, 85, 247, 0.3), transparent 50%),
            radial-gradient(ellipse 50% 80% at 90% 60%, rgba(139, 92, 246, 0.25), transparent 50%);
          animation: mesh-shift 20s ease-in-out infinite;
        }
        
        .dark .mesh-bg {
          background: 
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(139, 92, 246, 0.5), transparent 50%),
            radial-gradient(ellipse 60% 60% at 80% 20%, rgba(217, 70, 239, 0.45), transparent 50%),
            radial-gradient(ellipse 70% 70% at 50% 80%, rgba(168, 85, 247, 0.4), transparent 50%),
            radial-gradient(ellipse 50% 80% at 90% 60%, rgba(139, 92, 246, 0.35), transparent 50%);
        }
        
        @keyframes mesh-shift {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg);
            filter: hue-rotate(0deg);
          }
          25% { 
            transform: translate(2%, -2%) rotate(1deg);
            filter: hue-rotate(10deg);
          }
          50% { 
            transform: translate(-1%, 2%) rotate(-1deg);
            filter: hue-rotate(-5deg);
          }
          75% { 
            transform: translate(-2%, -1%) rotate(0.5deg);
            filter: hue-rotate(5deg);
          }
        }
        
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          will-change: transform;
          pointer-events: none;
        }
        
        .orb-1 {
          width: 600px;
          height: 600px;
          top: -15%;
          left: -10%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0) 70%);
          animation: float-1 20s ease-in-out infinite;
        }
        
        .orb-2 {
          width: 500px;
          height: 500px;
          bottom: -10%;
          right: -5%;
          background: radial-gradient(circle, rgba(217, 70, 239, 0.7) 0%, rgba(217, 70, 239, 0) 70%);
          animation: float-2 25s ease-in-out infinite;
        }
        
        .orb-3 {
          width: 400px;
          height: 400px;
          top: 50%;
          left: 40%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(168, 85, 247, 0) 70%);
          animation: float-3 18s ease-in-out infinite;
        }
        
        .orb-4 {
          width: 350px;
          height: 350px;
          top: 20%;
          right: 15%;
          background: radial-gradient(circle, rgba(192, 132, 252, 0.5) 0%, rgba(192, 132, 252, 0) 70%);
          animation: float-4 22s ease-in-out infinite;
        }
        
        .orb-5 {
          width: 300px;
          height: 300px;
          bottom: 30%;
          left: 20%;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(236, 72, 153, 0) 70%);
          animation: float-5 28s ease-in-out infinite;
        }
        
        .dark .orb-1 { opacity: 0.7; }
        .dark .orb-2 { opacity: 0.6; }
        .dark .orb-3 { opacity: 0.5; }
        .dark .orb-4 { opacity: 0.5; }
        .dark .orb-5 { opacity: 0.4; }
        
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(60px, 40px) scale(1.1); }
          50% { transform: translate(30px, 80px) scale(0.95); }
          75% { transform: translate(-30px, 40px) scale(1.05); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, -40px) scale(1.1); }
          66% { transform: translate(-80px, -20px) scale(0.9); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-40%, -60%) scale(1.2); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(-40px, 60px) scale(1.15) rotate(10deg); }
        }
        
        @keyframes float-5 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -30px) scale(1.1); }
          66% { transform: translate(-30px, -50px) scale(0.95); }
        }
        
        .glow-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.8), rgba(217, 70, 239, 0.8), transparent);
          filter: blur(1px);
          opacity: 0.6;
        }
        
        .dark .glow-line {
          opacity: 0.8;
        }
        
        .glow-line-1 {
          width: 40%;
          top: 30%;
          left: 10%;
          transform: rotate(-15deg);
          animation: line-float-1 12s ease-in-out infinite;
        }
        
        .glow-line-2 {
          width: 30%;
          top: 60%;
          right: 15%;
          transform: rotate(20deg);
          animation: line-float-2 15s ease-in-out infinite;
        }
        
        .glow-line-3 {
          width: 25%;
          bottom: 25%;
          left: 30%;
          transform: rotate(-5deg);
          animation: line-float-3 18s ease-in-out infinite;
        }
        
        @keyframes line-float-1 {
          0%, 100% { transform: rotate(-15deg) translateY(0); opacity: 0.6; }
          50% { transform: rotate(-10deg) translateY(-30px); opacity: 0.9; }
        }
        
        @keyframes line-float-2 {
          0%, 100% { transform: rotate(20deg) translateX(0); opacity: 0.5; }
          50% { transform: rotate(25deg) translateX(40px); opacity: 0.8; }
        }
        
        @keyframes line-float-3 {
          0%, 100% { transform: rotate(-5deg) translate(0, 0); opacity: 0.4; }
          50% { transform: rotate(0deg) translate(20px, -20px); opacity: 0.7; }
        }
        
        .particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.9) 0%, rgba(168, 85, 247, 0) 70%);
          border-radius: 50%;
          animation: particle-float 20s ease-in-out infinite;
        }
        
        .particle-1 { background: radial-gradient(circle, rgba(139, 92, 246, 0.9) 0%, transparent 70%); width: 6px; height: 6px; }
        .particle-2 { background: radial-gradient(circle, rgba(217, 70, 239, 0.8) 0%, transparent 70%); width: 5px; height: 5px; }
        .particle-3 { background: radial-gradient(circle, rgba(168, 85, 247, 0.9) 0%, transparent 70%); width: 4px; height: 4px; }
        .particle-4 { background: radial-gradient(circle, rgba(192, 132, 252, 0.8) 0%, transparent 70%); width: 6px; height: 6px; }
        .particle-5 { background: radial-gradient(circle, rgba(236, 72, 153, 0.7) 0%, transparent 70%); width: 5px; height: 5px; }
        .particle-6 { background: radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%); width: 4px; height: 4px; }
        .particle-7 { background: radial-gradient(circle, rgba(217, 70, 239, 0.9) 0%, transparent 70%); width: 7px; height: 7px; }
        .particle-8 { background: radial-gradient(circle, rgba(168, 85, 247, 0.7) 0%, transparent 70%); width: 5px; height: 5px; }
        .particle-9 { background: radial-gradient(circle, rgba(192, 132, 252, 0.9) 0%, transparent 70%); width: 4px; height: 4px; }
        .particle-10 { background: radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, transparent 70%); width: 6px; height: 6px; }
        
        @keyframes particle-float {
          0% { 
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% { 
            transform: translate(calc(var(--random-x, 50px)), calc(var(--random-y, -100px))) scale(1.5);
            opacity: 0.8;
          }
          90% {
            opacity: 1;
          }
          100% { 
            transform: translate(calc(var(--random-x, 50px) * 2), calc(var(--random-y, -100px) * 2)) scale(1);
            opacity: 0;
          }
        }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
